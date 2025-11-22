import React, { useState } from 'react';
import { Layers, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
            <Layers className="h-4 w-4 text-indigo-600" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Pocketly</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900 transition-colors">Overview</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Updates</a>
          <div className="h-4 w-px bg-slate-200"></div>
          <a href="#" className="hover:text-slate-900 transition-colors">Log in</a>
        </div>

        <button 
          className="md:hidden p-2 text-slate-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 py-4">
          <div className="flex flex-col gap-4 text-sm font-medium text-slate-600">
            <a href="#" className="block hover:text-slate-900">Overview</a>
            <a href="#" className="block hover:text-slate-900">Updates</a>
            <a href="#" className="block hover:text-slate-900">Log in</a>
          </div>
        </div>
      )}
    </nav>
  );
}
