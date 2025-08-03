import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Menu, X, Bitcoin, User, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast({
        title: "Logout Berhasil",
        description: "Anda telah keluar dari akun.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 crypto-glow">
            <Bitcoin className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">CryptoWise</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:text-primary">
                  <span>Beranda</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center w-full">
                    <span>Beranda</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about" className="flex items-center w-full">
                    <span>Tentang Kami</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:text-primary">
                  <span>Pembelajaran</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/articles" className="flex items-center w-full">
                    <span>Artikel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/news" className="flex items-center w-full">
                    <span>Berita Kripto</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:text-primary">
                  <span>Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/token-analyzer" className="flex items-center w-full">
                    <span>Token Analyzer</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/chat" className="flex items-center w-full">
                    <span>AI Chat</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {currentUser.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden xl:block text-sm text-foreground/80 max-w-32 truncate">
                      {currentUser.email}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil Saya</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="sm"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  size="sm"
                  className="crypto-glow"
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 rounded-lg mt-2 backdrop-blur-sm border border-border/50 shadow-lg">
              <Link 
                to="/" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/articles" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Artikel
              </Link>
              <Link 
                to="/news" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Berita Kripto
              </Link>
              <Link 
                to="/token-analyzer" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Token Analyzer
              </Link>
              <Link 
                to="/chat" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                AI Chat
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              {currentUser ? (
                <div className="px-3 py-2 space-y-2 border-t border-border/50 mt-2 pt-4">
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Profil Saya</span>
                  </Link>
                  <p className="text-xs text-foreground/60 px-3 truncate">{currentUser.email}</p>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2 border-t border-border/50 mt-2 pt-4">
                  <Button 
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/register');
                      setIsOpen(false);
                    }}
                    size="sm"
                    className="w-full crypto-glow"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;