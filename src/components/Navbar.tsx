import React, { useState } from 'react';
import { Layers, Menu, X } from 'lucide-react';
import { Link } from 'react-router';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-100 bg-[#FAFAF9]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white shadow-sm">
            <Layers className="h-4 w-4 text-orange-600" />
          </div>
          <Link to={"/"} className="text-lg font-bold tracking-tight text-stone-900">Pocketly</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          {/*<a href="#" className="hover:text-stone-900 transition-colors">Overview</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Updates</a>*/}
          {/*<div className="h-4 w-px bg-stone-200"></div>*/}
          <Link to={"/signin"} className="block hover:text-stone-900">Log in</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-stone-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-stone-100 bg-[#FAFAF9] px-4 py-4">
          <div className="flex flex-col gap-4 text-sm font-medium text-stone-600">
            {/*<a href="#" className="block hover:text-stone-900">Overview</a>*/}
            {/*<a href="#" className="block hover:text-stone-900">Updates</a>*/}
            <Link to={"/signin"} className="block hover:text-stone-900">Log in</Link>
          </div>
        </div>
      )}
    </nav>
  );
}