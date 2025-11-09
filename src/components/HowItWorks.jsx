import React from 'react';
import { Wand2, Subtitles, Crop, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Crop className="h-5 w-5 text-sky-300" />,
      title: 'Auto Reframe',
      desc: 'Deteksi wajah dan action untuk framing 9:16 yang nyaman ditonton.',
    },
    {
      icon: <Subtitles className="h-5 w-5 text-amber-300" />,
      title: 'Auto Captions',
      desc: 'Subtitle bergaya TikTok + emoji & highlight kata penting.',
    },
    {
      icon: <Wand2 className="h-5 w-5 text-emerald-300" />,
      title: 'Smart Cut',
      desc: 'Potong jeda, tambahkan zoom punch-in/out mengikuti beat musik.',
    },
    {
      icon: <Sparkles className="h-5 w-5 text-pink-300" />,
      title: 'Auto B-roll',
      desc: 'Tambahkan footage relevan sesuai konteks untuk bikin makin engaging.',
    },
  ];

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
        <h3 className="text-white font-semibold text-lg mb-4">Cara Kerja</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                {s.icon}
              </div>
              <h4 className="text-white font-medium">{s.title}</h4>
              <p className="text-slate-400 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
