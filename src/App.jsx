import { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadPanel from './components/UploadPanel';
import PreviewPlayer from './components/PreviewPlayer';
import HowItWorks from './components/HowItWorks';

function useProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultBlob, setResultBlob] = useState(null);
  const [resultName, setResultName] = useState('viral-cut');

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

  const start = async ({ file }) => {
    setIsProcessing(true);
    setProgress(0);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setResultBlob(null);

    // Fast processing timeline (~1 second total)
    const increments = [30, 40, 30];
    for (const inc of increments) {
      await new Promise((r) => setTimeout(r, 330));
      setProgress((p) => Math.min(99, p + inc));
    }

    // For demo: return original file as processed output, ensuring reliable download
    const processed = new Blob([await file.arrayBuffer()], { type: file.type || 'video/mp4' });
    const url = URL.createObjectURL(processed);
    setResultBlob(processed);
    setResultUrl(url);
    const ext = extFromMime(processed.type);
    setResultName(`viral-cut${ext}`);

    setIsProcessing(false);
    setProgress(100);

    // Auto-download immediately once ready
    setTimeout(() => {
      const a = document.createElement('a');
      const dlUrl = URL.createObjectURL(processed);
      a.href = dlUrl;
      a.download = `viral-cut${ext}` || 'viral-cut';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(dlUrl);
    }, 50);
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
