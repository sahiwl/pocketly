import React from "react";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}
