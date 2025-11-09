import React from 'react';
import { Rocket, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-400/30 flex items-center justify-center">
            <Rocket className="h-6 w-6 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Auto Viral Video Editor
            </h1>
            <p className="text-sm md:text-base text-slate-300/90">
              Edit otomatis, tempo cepat, sentuhan sinematik — siap upload dalam hitungan detik.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-3 flex items-center gap-2 text-slate-200">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Highlight otomatis & punch-in</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-3 flex items-center gap-2 text-slate-200">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <span>Reformat 9:16, 1:1, 16:9</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-3 flex items-center gap-2 text-slate-200">
            <Sparkles className="h-4 w-4 text-sky-300" />
            <span>Tambahkan B-roll/footage tambahan</span>
          </div>
        </div>
      </div>
    </header>
  );
}
