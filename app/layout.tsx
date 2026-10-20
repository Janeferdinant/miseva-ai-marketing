import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miseva AI Marketing Platform â€” Autonomous Social Media & Growth Engine",
  description: "Autonomous multi-channel marketing, social media scheduling, AI content studio, and customer segmentation engine. Academic Lead: Jane Rose, Assistant Professor, CSE.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans selection:bg-emerald-500 selection:text-white">
        <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-emerald-500/20">
              M
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                Miseva AI <span className="text-emerald-400 font-semibold text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">Marketing Engine</span>
              </div>
              <div className="text-[10px] text-slate-400">Autonomous Culinary Growth & Campaign Hub</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="hidden sm:inline">Lead: <strong className="text-slate-200">Jane Rose</strong>, Asst. Prof, CSE</span>
            <a 
              href="https://cusine-chi.vercel.app" 
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-medium transition"
            >
              Open Cuisine App &rarr;
            </a>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
