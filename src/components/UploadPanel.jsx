import { useState, useRef, useEffect } from 'react';
import { Upload, Scissors, Film, Sparkles } from 'lucide-react';

export default function UploadPanel({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState('auto');
  const [ratio, setRatio] = useState('9:16');
  const [injectBroll, setInjectBroll] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      // cleanup any created URLs on unmount
      if (file && file.previewUrl) URL.revokeObjectURL(file.previewUrl);
    };
  }, [file]);

  const handleFile = (f) => {
    if (!f) return;
    const allowed = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska'];
    if (!allowed.includes(f.type)) {
      alert('Unsupported format. Please upload MP4, MOV, WEBM, or MKV.');
      return;
    }
    const previewUrl = URL.createObjectURL(f);
    setFile({ raw: f, previewUrl });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a video first.');
      return;
    }
    onSubmit({ file: file.raw, previewUrl: file.previewUrl, duration, ratio, injectBroll });
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="lg:col-span-2 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-6 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            {file ? (
              <video src={file.previewUrl} controls className="w-full rounded-xl shadow-sm" />
            ) : (
              <>
                <div className="h-14 w-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Drag & drop your video here</p>
                  <p className="text-sm text-muted-foreground">MP4, MOV, WEBM. Up to 2GB.</p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 transition">
                  Choose file
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-2 font-semibold mb-4">
              <Scissors className="h-4 w-4" /> Smart Editing
            </div>
            <label className="block text-sm mb-1">Duration</label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded-lg border px-3 py-2 bg-transparent">
              <option value="auto">Auto (best for FYP)</option>
              <option value="15">15s</option>
              <option value="30">30s</option>
              <option value="60">60s</option>
            </select>

            <label className="block text-sm mt-4 mb-1">Format</label>
            <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="w-full rounded-lg border px-3 py-2 bg-transparent">
              <option value="9:16">Vertical 9:16</option>
              <option value="1:1">Square 1:1</option>
              <option value="16:9">Landscape 16:9</option>
            </select>

            <label className="flex items-center gap-2 mt-4">
              <input type="checkbox" checked={injectBroll} onChange={(e) => setInjectBroll(e.target.checked)} />
              <span className="flex items-center gap-1"><Film className="h-3.5 w-3.5" /> Inject auto B‑roll</span>
            </label>
          </div>

          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white py-3 font-medium shadow hover:opacity-90">
            <Sparkles className="h-4 w-4" /> Make it FYP
          </button>
        </div>
      </form>
    </section>
  );
}
