import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, X, Bitcoin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Beranda
            </Link>
            <Link 
              to="/articles" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Artikel
            </Link>
            <Link 
              to="/news" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Berita Kripto
            </Link>
            <Link 
              to="/token-analyzer" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Token Analyzer
            </Link>
            <Link 
              to="/chat" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              AI Chat
            </Link>
            <Link 
              to="/about" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-foreground/60">
                  {currentUser.email}
                </span>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
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
          <div className="md:hidden">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/50 rounded-lg mt-2 backdrop-blur-sm">
              <Link 
                to="/" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/articles" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Artikel
              </Link>
              <Link 
                to="/news" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Berita Kripto
              </Link>
              <Link 
                to="/token-analyzer" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Token Analyzer
              </Link>
              <Link 
                to="/chat" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                AI Chat
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              {currentUser ? (
                <div className="px-3 py-2 space-y-2">
                  <p className="text-sm text-foreground/60">{currentUser.email}</p>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
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
                    className="w-full"
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