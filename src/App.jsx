import { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadPanel from './components/UploadPanel';
import PreviewPlayer from './components/PreviewPlayer';
import HowItWorks from './components/HowItWorks';

function useProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState(null);

  const start = async ({ file, previewUrl, duration, ratio, injectBroll }) => {
    setIsProcessing(true);
    setProgress(0);
    setResultUrl(null);

    // Simulate staged processing timeline for UX realism
    const steps = [
      { label: 'Analyzing audio and scenes', inc: 20 },
      { label: 'Smart cuts & silence removal', inc: 35 },
      { label: 'Auto reframe for ratio', inc: 25 },
      { label: 'Injecting B-roll & captions', inc: 20 },
    ];

    for (const s of steps) {
      await new Promise((r) => setTimeout(r, 600));
      setProgress((p) => Math.min(99, p + s.inc));
    }

    // In a real app, this would be the processed blob from backend.
    // For demo, we return the original file as the result URL.
    const processedBlob = file;
    const processedUrl = URL.createObjectURL(processedBlob);
    setResultUrl(processedUrl);
    setIsProcessing(false);
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'viral-cut.mp4';
    document.body.appendChild(a);
    a.click();
    a.remove();
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
