import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Bitcoin, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Mohon isi semua field",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await login(email, password);
      if (error) {
        toast({
          title: "Login Gagal",
          description: error.message || "Email atau password salah",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali!",
        });
        navigate('/articles');
      }
    } catch (error: any) {
      toast({
        title: "Login Gagal",
        description: error.message || "Terjadi kesalahan sistem",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl floating-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 crypto-glow">
            <Bitcoin className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">CryptoWise</span>
          </Link>
          <p className="text-foreground/70 mt-2">Masuk ke akun Anda</p>
        </div>

        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-foreground/50" />
                    ) : (
                      <Eye className="h-4 w-4 text-foreground/50" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full crypto-glow" 
                disabled={loading}
              >
                {loading ? "Sedang Login..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-foreground/60">
                Belum punya akun?{' '}
                <Link 
                  to="/register" 
                  className="text-primary hover:underline font-medium"
                >
                  Daftar di sini
                </Link>
              </p>
              
              <p className="text-xs text-foreground/50">
                Dengan login, Anda menyetujui{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Account Info */}
        <Card className="mt-6 crypto-card bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 text-primary">Demo Account</h4>
            <p className="text-sm text-foreground/70 mb-2">
              Untuk testing, Anda bisa membuat akun baru atau gunakan:
            </p>
            <div className="text-xs text-foreground/60 space-y-1">
              <div>Email: demo@cryptowise.id</div>
              <div>Password: demo123456</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;