import { Download, Loader2 } from 'lucide-react';

export default function PreviewPlayer({ isProcessing, progress, videoUrl, onDownload }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
            <p className="font-medium">Processing your viral cut…</p>
            <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">Auto cutting, reframing, captions, B‑roll injection</p>
          </div>
        ) : videoUrl ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <video src={videoUrl} controls className="w-full rounded-xl shadow" />
            </div>
            <div className="space-y-3">
              <button onClick={onDownload} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white py-3 font-medium shadow hover:bg-indigo-700">
                <Download className="h-4 w-4" /> Download result
              </button>
              <ul className="text-sm text-muted-foreground list-disc ml-5">
                <li>Hook optimized first 3 seconds</li>
                <li>Auto zoom & reframe for 9:16</li>
                <li>Sound levels normalized</li>
                <li>Captions with emphasis keyframes</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground">Upload a video to see the preview here.</div>
        )}
      </div>
    </section>
  );
}
