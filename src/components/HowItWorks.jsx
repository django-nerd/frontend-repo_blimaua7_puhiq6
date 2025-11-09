import { CheckCircle2, Captions, Crop, Wand2, Film } from 'lucide-react';

export default function HowItWorks() {
  const items = [
    { icon: <Wand2 className="h-4 w-4" />, title: 'Smart Cut', desc: 'Detects silence and jump-cuts to keep only the best bits.' },
    { icon: <Crop className="h-4 w-4" />, title: 'Auto Reframe', desc: 'Centers faces and key action for perfect 9:16 vertical.' },
    { icon: <Captions className="h-4 w-4" />, title: 'Captions', desc: 'Readable, high-contrast captions tuned for mobile.' },
    { icon: <Film className="h-4 w-4" />, title: 'Auto B‑roll', desc: 'Adds relevant cutaways to boost retention.' },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
        <div className="flex items-center gap-2 font-semibold mb-6">
          <CheckCircle2 className="h-4 w-4" /> How it works
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border p-4 bg-white/60 dark:bg-neutral-900/60">
              <div className="flex items-center gap-2 font-medium">
                {it.icon}
                {it.title}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
