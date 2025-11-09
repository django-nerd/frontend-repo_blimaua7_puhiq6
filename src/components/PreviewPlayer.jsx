import React from 'react';
import { Play, Download } from 'lucide-react';

export default function PreviewPlayer({ processing, progress, previewUrl, onDownload }) {
  return (
    <section className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/80 backdrop-blur p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg md:text-xl font-semibold text-white">Preview</h2>
        {previewUrl && (
          <button onClick={onDownload} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition text-white font-medium py-2 px-3">
            <Download className="h-4 w-4" /> Unduh Video
          </button>
        )}
      </div>

      <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center">
        {!previewUrl ? (
          <div className="text-center p-6">
            {processing ? (
              <div>
                <div className="w-64 h-2 bg-slate-800 rounded overflow-hidden">
                  <div className="h-full bg-indigo-500 animate-[progress_1.2s_ease-in-out_infinite]" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-slate-300 mt-3 text-sm">Memproses video... {progress}%</p>
                <style>{`@keyframes progress { 0%{transform: translateX(-100%);} 50%{transform: translateX(-50%);} 100%{transform: translateX(0%);} }`}</style>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Play className="h-6 w-6" />
                <p className="text-sm">Upload video untuk melihat hasil</p>
              </div>
            )}
          </div>
        ) : (
          <video src={previewUrl} controls className="w-full h-full" />
        )}
      </div>
    </section>
  );
}
