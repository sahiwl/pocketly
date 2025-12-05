import {
  Layers, Inbox, Star, Clock, Hash, Command, Zap, 
  MessageSquare, Image as ImageIcon, Globe 
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-slate-900">
          Your Personalized Knowledge Base
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Available wherever you browse.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 ring-1 ring-slate-950/5">
        {/* Window Header */}
        <div className="flex h-10 items-center justify-center border-b border-slate-100 bg-white px-4 relative">
          <div className="absolute left-4 flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-slate-200"></div>
            <div className="h-3 w-3 rounded-full bg-slate-200"></div>
            <div className="h-3 w-3 rounded-full bg-slate-200"></div>
          </div>
          <div className="flex items-center gap-1.5 rounded text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 border border-slate-100">
            <Layers size={10} />
            pocketly.app/dashboard
          </div>
        </div>

        {/* App Interface */}
        <div className="flex h-[600px] bg-slate-50/50 md:h-[550px]">
          {/* Sidebar */}
          <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white p-4">
            <div className="mb-6">
              <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Library</div>
              <nav className="space-y-0.5">
                <SidebarItem icon={Inbox} label="Inbox" count={4} active />
                <SidebarItem icon={Star} label="Favorites" />
                <SidebarItem icon={Clock} label="Read Later" />
              </nav>
            </div>
            <div>
              <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Collections</div>
              <nav className="space-y-0.5">
                <SidebarItem icon={Hash} label="Design" />
                <SidebarItem icon={Hash} label="Development" />
                <SidebarItem icon={Hash} label="Recipes" />
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Input Area */}
            <div className="p-6 pb-2">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-slate-400">
                  <Layers size={12} />
                </div>
                <input
                  type="text"
                  placeholder="Paste a URL to save..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-700"
                />
                <div className="hidden sm:flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                  <Command size={10} />V
                </div>
              </div>
            </div>

            {/* Feed */}
            <div className="flex-1 overflow-hidden p-6 pt-2 space-y-4">
              <FeedItem
                icon={<Zap size={12} />}
                iconColor="text-orange-600 bg-orange-50"
                source="Hacker News"
                time="Just now"
                title="Show HN: A new way to visualize codebase architecture"
                description="We built a tool that generates interactive 3D maps of your git repositories to help new engineers onboard faster."
              />
              <FeedItem
                icon={<MessageSquare size={12} />}
                iconColor="text-blue-500 bg-blue-50"
                source="Twitter Thread"
                time="2h ago"
                title="10 Design Rules for 2024"
                description="1. Density is back. 2. Skeuomorphism is subtle but present. 3. Typography is getting tighter..."
                opacity="opacity-90"
              />
              <FeedItem
                icon={<ImageIcon size={12} />}
                iconColor="text-pink-500 bg-pink-50"
                source="Dribbble"
                time="5h ago"
                title="Financial Dashboard Exploration"
                description="Exploring a light mode interface for a fintech banking application with focus on data visualization."
                opacity="opacity-75"
              />
              <div className="rounded-xl border border-slate-100 bg-white p-5 opacity-40 blur-[1px]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">
                    <Globe size={12} /> Medium
                  </div>
                  <span className="text-[10px] text-slate-300">1d ago</span>
                </div>
                <div className="h-5 w-3/4 bg-slate-100 rounded mb-2"></div>
                <div className="h-4 w-full bg-slate-50 rounded mb-1"></div>
                <div className="h-4 w-2/3 bg-slate-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -inset-4 -z-10 bg-gradient-to-b from-slate-100/50 to-white opacity-50 blur-xl rounded-[3rem]"></div>
    </div>
  );
}

// Helper Components (can remain in same file or be split further)
function SidebarItem({
  icon: Icon,
  label,
  count,
  active,
}: {
  icon: any;
  label: string;
  count?: number;
  active?: boolean;
}) {
  return (
    <a
      href="#"
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={16} className={active ? 'text-indigo-600' : 'text-slate-400'} />
        {label}
      </div>
      {count && (
        <span
          className={`flex h-5 min-w-[1.25rem] items-center justify-center rounded px-1 text-[10px] font-bold ${active ? "bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100" : "bg-slate-100 text-slate-500"}`}
        >
          {count}
        </span>
      )}
    </a>
  );
}

function FeedItem({
  icon,
  iconColor,
  source,
  time,
  title,
  description,
  opacity = "",
}: any) {
  return (
    <div
      className={`group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 ${opacity}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className={`flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-medium ${iconColor}`}
        >
          {icon} {source}
        </div>
        <span className="text-[10px] text-slate-400">{time}</span>
      </div>
      <h4 className="mb-2 text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-slate-500 line-clamp-2">
        {description}
      </p>
    </div>
  );
}
