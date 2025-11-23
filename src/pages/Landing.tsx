import React from "react";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans text-stone-900 selection:bg-orange-100 selection:text-orange-900">     
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}
