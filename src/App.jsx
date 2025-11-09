import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import UploadPanel from './components/UploadPanel';
import PreviewPlayer from './components/PreviewPlayer';
import HowItWorks from './components/HowItWorks';

const resolveBackendUrl = () => {
  const env = import.meta.env.VITE_BACKEND_URL;
  if (env && typeof env === 'string') return env.replace(/\/$/, '');
  try {
    const current = new URL(window.location.href);
    // Swap to backend port while keeping host and protocol
    current.port = '8000';
    return current.origin;
  } catch {
    return 'http://localhost:8000';
  }
};

const BACKEND_URL = resolveBackendUrl();

function useProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultBlob, setResultBlob] = useState(null);
  const [resultName, setResultName] = useState('viral-cut');
  const controllerRef = useRef(null);

  const extFromMime = (mime) => {
    switch (mime) {
      case 'video/mp4':
        return '.mp4';
      case 'video/quicktime':
        return '.mov';
      case 'video/webm':
        return '.webm';
      case 'video/x-matroska':
        return '.mkv';
      default:
        return '';
    }
  };

  // Parse duration in seconds from a File by loading metadata via <video>
  const getDurationSec = (file) => new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const video = document.createElement('video');
      const cleanup = () => {
        URL.revokeObjectURL(url);
        video.remove();
      };
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const d = video.duration;
        cleanup();
        resolve(isFinite(d) ? d : NaN);
      };
      video.onerror = () => {
        cleanup();
        resolve(NaN);
      };
      video.src = url;
    } catch (e) {
      resolve(NaN);
    }
  });

  const start = async ({ file }) => {
    if (!file) return;

    // Validate duration <= 2s (hard requirement for viral cut). If longer, continue; backend will enforce trimming.
    const duration = await getDurationSec(file);
    if (!Number.isNaN(duration) && duration > 2.05) {
      alert(`Video lebih dari 2 detik (${duration.toFixed(2)}s). Akan dipangkas ke 2 detik. Perkiraan tunggu: ~1 detik.`);
    }

    setIsProcessing(true);
    setProgress(0);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setResultBlob(null);

    // Fast progress timeline (~1s)
    const increments = [30, 40, 30];
    for (const inc of increments) {
      await new Promise((r) => setTimeout(r, 330));
      setProgress((p) => Math.min(99, p + inc));
    }

    // Call backend for processing + server-side enforcement of max 2s
    try {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();
      const body = new FormData();
      body.append('file', file, file.name || 'input');

      const res = await fetch(`${BACKEND_URL}/api/process`, {
        method: 'POST',
        body,
        signal: controllerRef.current.signal,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Processing failed');
      }

      const contentType = res.headers.get('content-type') || 'video/mp4';
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      const ext = extFromMime(contentType);
      setResultName(`viral-cut${ext}`);

      setIsProcessing(false);
      setProgress(100);

      // Auto-download after 50ms
      setTimeout(() => {
        const a = document.createElement('a');
        const dlUrl = URL.createObjectURL(blob);
        a.href = dlUrl;
        a.download = `viral-cut${ext}` || 'viral-cut';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(dlUrl);
      }, 50);
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
      alert('Gagal memproses video. Pastikan backend aktif lalu coba lagi.');
    }
  };

  const download = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resultName || 'viral-cut';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  return { isProcessing, progress, resultUrl, start, download };
}

export default function App() {
  const { isProcessing, progress, resultUrl, start, download } = useProcessing();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-50">
      <Header />
      <UploadPanel onSubmit={start} />
      <PreviewPlayer isProcessing={isProcessing} progress={progress} videoUrl={resultUrl} onDownload={download} />
      <HowItWorks />
      <footer className="mx-auto max-w-6xl px-6 pb-10 text-xs text-muted-foreground">Built for creators who want results fast.</footer>
    </div>
  );
}
