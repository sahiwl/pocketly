import { Layers } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-100 bg-[#FAFAF9] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-stone-500">
          <Layers className="h-4 w-4 text-stone-400" />
          <span>© 2025 Pocketly Inc.</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-stone-500">
          {/*<a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>*/}
          {/*<a href="#" className="hover:text-stone-900 transition-colors">Terms</a>*/}
          <a
            href="https://www.twitter.com/sahilwithocd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-900 transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
