import { Rocket, Wand2, Video, Layers } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">Auto Viral Video Editor</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1">
              <Wand2 className="h-3.5 w-3.5" /> Smart Cuts
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 px-3 py-1">
              <Video className="h-3.5 w-3.5" /> 9:16 Reframe
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 text-violet-700 px-3 py-1">
              <Layers className="h-3.5 w-3.5" /> Auto B‑roll
            </span>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Turn any clip into FYP‑ready content
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Upload your video, choose the format, and we’ll auto-cut, reframe for vertical, and inject relevant B‑roll for maximum watch time.
          </p>
        </div>
      </div>
    </header>
  );
}
