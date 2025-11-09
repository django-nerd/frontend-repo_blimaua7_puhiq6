import React, { useRef, useState } from 'react';
import { UploadCloud, Scissors, Film, Play, Clock } from 'lucide-react';

export default function UploadPanel({ onSubmit }) {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState('auto');
  const [format, setFormat] = useState('9:16');
  const [broll, setBroll] = useState(true);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const triggerPick = () => fileRef.current?.click();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onSubmit?.({ file, options: { duration, format, broll } });
  };

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 md:p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-400/30 flex items-center justify-center">
              <UploadCloud className="h-6 w-6 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-white">Upload Video</h2>
              <p className="text-slate-300/80 text-sm">Kami akan otomatis menambahkan pacing, subtitle, dan B-roll.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div onClick={triggerPick} className="group cursor-pointer rounded-xl border border-dashed border-white/15 bg-slate-900/50 hover:bg-slate-900/70 transition p-6 flex items-center justify-center text-center min-h-[160px]">
              <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
              {file ? (
                <div className="text-left w-full">
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-slate-400 text-sm mt-1">Klik untuk ganti video</p>
                </div>
              ) : (
                <div>
                  <p className="text-white font-medium">Tarik & lepas video, atau klik untuk pilih</p>
                  <p className="text-slate-400 text-sm mt-1">Format MP4, MOV, WEBM hingga 500MB</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-slate-200">
              <Scissors className="h-4 w-4" />
              <span>Durasi</span>
            </label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded-lg bg-slate-900/60 border border-white/10 p-2 text-white">
              <option value="auto">Auto (smart cut)</option>
              <option value="60">60 detik</option>
              <option value="30">30 detik</option>
              <option value="15">15 detik</option>
            </select>

            <label className="flex items-center gap-2 text-slate-200 mt-4">
              <Film className="h-4 w-4" />
              <span>Rasio</span>
            </label>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full rounded-lg bg-slate-900/60 border border-white/10 p-2 text-white">
              <option value="9:16">9:16 (Full Vertikal)</option>
              <option value="1:1">1:1 (Square)</option>
              <option value="16:9">16:9 (Landscape)</option>
            </select>

            <label className="flex items-center gap-2 text-slate-200 mt-4">
              <Clock className="h-4 w-4" />
              <span>B-roll tambahan</span>
            </label>
            <div className="flex items-center gap-3">
              <input id="broll" type="checkbox" checked={broll} onChange={(e) => setBroll(e.target.checked)} className="accent-indigo-500" />
              <label htmlFor="broll" className="text-slate-300 text-sm">Otomatis menambahkan footage relevan</label>
            </div>

            <button disabled={!file} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium py-2.5 disabled:opacity-50">
              <Play className="h-4 w-4" /> Proses Otomatis
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
