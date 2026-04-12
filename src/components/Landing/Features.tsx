import { Zap, Sparkles, Search } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-3">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Three simple steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title="Paste & save"
            description="Drop a URL. We pull the title, image, and metadata automatically. Done in under a second."
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Auto organized"
            description="Every link gets tagged and categorized by AI. You never have to sort anything yourself."
          />
          <FeatureCard
            icon={<Search className="h-5 w-5" />}
            title="Find anything"
            description="Search with plain words. 'that pasta recipe from last winter' yeah, it works like that."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="group rounded-2xl border border-stone-100 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-100 bg-stone-50 text-stone-900 transition-colors group-hover:border-orange-100 group-hover:bg-orange-50 group-hover:text-orange-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-stone-900">{title}</h3>
      <p className="text-sm leading-relaxed text-stone-500">{description}</p>
    </div>
  );
}
