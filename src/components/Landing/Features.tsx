import React from 'react';
import { Zap, Sparkles, Search } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard 
            icon={<Zap className="h-5 w-5" />}
            title="Instant Capture"
            description="Save anything from your browser in milliseconds. Just CMD+V and you're done."
          />
          <FeatureCard 
            icon={<Sparkles className="h-5 w-5" />}
            title="AI Summaries"
            description="Don't have time to read? Get a 3-bullet summary of any article instantly."
          />
          <FeatureCard 
            icon={<Search className="h-5 w-5" />}
            title="Smart Search"
            description="Recall that recipe you saved 2 years ago with vague natural language search."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-900 transition-colors group-hover:border-indigo-100 group-hover:bg-indigo-50 group-hover:text-indigo-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}
