import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import UploadPanel from './components/UploadPanel';
import PreviewPlayer from './components/PreviewPlayer';
import HowItWorks from './components/HowItWorks';

function App() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  const currentObjectUrl = useRef('');

  useEffect(() => {
    return () => {
      if (currentObjectUrl.current) URL.revokeObjectURL(currentObjectUrl.current);
    };
  }, []);

  const simulateProcess = (file) => {
    setProcessing(true);
    setProgress(0);
    const total = 100;
    let p = 0;
    const tick = () => {
      p += Math.floor(Math.random() * 12) + 5;
      if (p >= total) {
        p = 100;
        setProgress(p);
        setProcessing(false);
        // Simulasi hasil: tampilkan file asli sebagai preview
        if (currentObjectUrl.current) URL.revokeObjectURL(currentObjectUrl.current);
        const url = URL.createObjectURL(file);
        currentObjectUrl.current = url;
        setPreviewUrl(url);
      } else {
        setProgress(p);
        setTimeout(tick, 350);
      }
    };
    setTimeout(tick, 400);
  };

  const handleSubmit = ({ file }) => {
    setPreviewUrl('');
    simulateProcess(file);
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = 'auto-edited-video.mp4';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(60%_80%_at_50%_0%,rgba(99,102,241,0.20),rgba(2,6,23,1))] from-slate-900 to-slate-950 text-slate-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <UploadPanel onSubmit={handleSubmit} />
          <HowItWorks />
        </div>
        <div className="space-y-6">
          <PreviewPlayer processing={processing} progress={progress} previewUrl={previewUrl} onDownload={handleDownload} />
          <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <h3 className="text-white font-semibold text-lg">Tips biar makin FYP</h3>
            <ul className="mt-3 list-disc list-inside text-slate-300 text-sm space-y-1">
              <li>Gunakan hook 1-2 detik pertama yang kuat.</li>
              <li>Tambahkan subtitle kontras dan cepat terbaca.</li>
              <li>Durasi 20-35 detik sering perform paling stabil.</li>
              <li>Pakai musik trend & beat yang konsisten.</li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        Dibuat untuk proses cepat — siap upload ke platform favoritmu.
      </footer>
    </div>
  );
}

export default App;
