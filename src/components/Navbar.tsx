import { useState } from "react";
import { Layers, Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-100 bg-[#FAFAF9]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white shadow-sm">
            <Layers className="h-4 w-4 text-orange-600" />
          </div>
          <Link
            to={"/"}
            className="text-lg font-bold tracking-tight text-stone-900"
          >
            Pocketly
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-stone-900 transition-colors"
              >
                Dashboard
              </Link>
              <div className="h-4 w-px bg-stone-200"></div>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 hover:bg-stone-100"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-semibold">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        ID: {user.id}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-stone-900 transition-colors"
              >
                Log in
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Sign up
                </Button>
              </Link>
            </>
          )}
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
            {user ? (
              <>
                <Link to="/dashboard" className="block hover:text-stone-900">
                  Dashboard
                </Link>
                <Link to="/temp" className="block hover:text-stone-900">
                  Content
                </Link>
                <div className="border-t border-stone-200 pt-4">
                  <div className="flex items-center gap-2 text-stone-900 mb-3">
                    <User className="h-4 w-4" />
                    <div>
                      <p className="font-semibold">{user.username}</p>
                      <p className="text-xs text-stone-600">ID: {user.id}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-stone-900">
                  Log in
                </Link>
                <Link to="/signup" className="block hover:text-stone-900">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
