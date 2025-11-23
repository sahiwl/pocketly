import React from 'react';
import { ArrowRight } from 'lucide-react';
import Dashboard from './Dashboard';
import { Link } from 'react-router';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/50 px-3 py-1 text-xs font-medium text-orange-600 transition-colors hover:bg-indigo-100/50 cursor-default">
          <span className="mr-2 flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
          </span>
          Live rn
          
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-stone-900 sm:text-6xl lg:text-7xl mb-6">
          Capture <span className="text-orange-600">Everything</span>,<br className="hidden sm:block" />
          Forget Nothing
        </h1>

        <p className="max-w-2xl text-lg text-stone-500 sm:text-xl mb-10 leading-relaxed">
          The ultimate tool for dumping interesting URLs, resources, and content. 
          Your digital second brain, now with intelligent organization.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-24 w-full sm:w-auto">
          <Link to={"/signup"} className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-stone-950 px-8 text-sm font-medium text-white transition-all hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-900/20">
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:transtone-x-0.5" />
          </Link>

        </div>

        <Dashboard />
      </div>
    </section>
  );
}
