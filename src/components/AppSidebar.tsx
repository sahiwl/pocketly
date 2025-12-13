import { Link, useNavigate, useLocation } from "react-router";
import {
  Layers,
  Hash,
  ChevronDown,
  ChevronUp,
  LogOut,
  Youtube,
  Loader2,
  LayoutDashboardIcon,
} from "lucide-react";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaFacebook,
  FaPinterest,
  FaLink,
} from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import { useTags } from "@/hooks/useTags";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const libraryItems: Array<{
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  href: string;
  badge?: string;
}> = [
  {
    title: "Youtube",
    icon: Youtube,
    type: "youtube",
    href: "/dashboard/type/youtube",
  },
  {
    title: "Twitter",
    icon: FaXTwitter,
    type: "tweet",
    href: "/dashboard/type/tweet",
  },
  {
    title: "Instagram",
    icon: FaInstagram,
    type: "instagram",
    href: "/dashboard/type/instagram",
  },
  {
    title: "LinkedIn",
    icon: FaLinkedin,
    type: "linkedin",
    href: "/dashboard/type/linkedin",
  },
  {
    title: "Pinterest",
    icon: FaPinterest,
    type: "pinterest",
    href: "/dashboard/type/pinterest",
  },
  {
    title: "Facebook",
    icon: FaFacebook,
    type: "facebook",
    href: "/dashboard/type/facebook",
  },
  {
    title: "Other",
    icon: FaLink,
    type: "other",
    href: "/dashboard/type/other",
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: tags = [], isLoading: isLoadingTags } = useTags();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userInitial = user?.username?.charAt(0).toUpperCase() || "U";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Pocketly">
              <Link to="/">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white shadow-sm">
                  <Layers className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-lg font-bold tracking-tight text-stone-900">
                  Pocketly
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Types Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-primary group-data-[collapsible=icon]:hidden">
            Types
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/dashboard"}
                  tooltip="Dashboard"
                >
                  <Link to="/dashboard">
                    <LayoutDashboardIcon className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {libraryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge className="bg-primary/10 text-primary group-data-[collapsible=icon]:hidden">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tags Section - Collapsible */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="text-xs font-semibold uppercase tracking-wider text-primary group-data-[collapsible=icon]:hidden"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                Tags
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {isLoadingTags ? (
                    <SidebarMenuItem>
                      <div className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Loading...</span>
                      </div>
                    </SidebarMenuItem>
                  ) : tags.length === 0 ? (
                    <SidebarMenuItem>
                      <div className="px-2 py-1.5 text-sm text-muted-foreground">
                        No tags yet
                      </div>
                    </SidebarMenuItem>
                  ) : (
                    tags.map((tag) => (
                      <SidebarMenuItem key={tag.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            location.pathname ===
                            `/dashboard/tag/${tag.title.toLowerCase()}`
                          }
                          tooltip={tag.title}
                        >
                          <Link
                            to={`/dashboard/tag/${encodeURIComponent(tag.title.toLowerCase())}`}
                          >
                            <Hash className="h-4 w-4" />
                            <span>{tag.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  tooltip={user?.username || "User"}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {/* First letter avatar */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                    {userInitial}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.username || "User"}
                    </span>
                    {/* <span className="truncate text-xs text-muted-foreground">
                      ID: {user?.id || "N/A"}
                    </span> */}
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
                align="start"
              >
                <DropdownMenuItem className="gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                    {userInitial}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.username || "User"}
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
