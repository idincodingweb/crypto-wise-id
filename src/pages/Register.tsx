import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Bitcoin, Eye, EyeOff, Check } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { label: 'Minimal 6 karakter', met: password.length >= 6 },
    { label: 'Mengandung huruf', met: /[a-zA-Z]/.test(password) },
    { label: 'Mengandung angka', met: /\d/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Mohon isi semua field",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password tidak cocok",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password minimal 6 karakter",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await register(email, password);
      if (error) {
        let errorMessage = "Terjadi kesalahan saat registrasi";
        
        if (error.message?.includes('email-already-in-use') || error.message?.includes('already registered')) {
          errorMessage = "Email sudah terdaftar";
        } else if (error.message?.includes('invalid-email')) {
          errorMessage = "Format email tidak valid";
        } else if (error.message?.includes('weak-password')) {
          errorMessage = "Password terlalu lemah";
        } else if (error.message) {
          errorMessage = error.message;
        }

        toast({
          title: "Registrasi Gagal", 
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registrasi Berhasil",
          description: "Akun Anda telah dibuat. Silakan cek email untuk verifikasi.",
        });
        navigate('/login');
      }
    } catch (error: any) {
      toast({
        title: "Registrasi Gagal",
        description: error.message || "Terjadi kesalahan sistem",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 crypto-glow">
            <Bitcoin className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">CryptoWise</span>
          </Link>
          <p className="text-foreground/70 mt-2">Buat akun baru Anda</p>
        </div>

        <Card className="crypto-card">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Daftar</CardTitle>
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
                    placeholder="Buat password"
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
                
                {/* Password Requirements */}
                {password && (
                  <div className="space-y-1 text-xs">
                    {passwordRequirements.map((req, index) => (
                      <div 
                        key={index}
                        className={`flex items-center space-x-1 ${
                          req.met ? 'text-green-500' : 'text-foreground/60'
                        }`}
                      >
                        <Check className={`h-3 w-3 ${req.met ? 'text-green-500' : 'text-transparent'}`} />
                        <span>{req.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-foreground/50" />
                    ) : (
                      <Eye className="h-4 w-4 text-foreground/50" />
                    )}
                  </Button>
                </div>
                
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500">Password tidak cocok</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full crypto-glow" 
                disabled={loading || password !== confirmPassword}
              >
                {loading ? "Sedang Mendaftar..." : "Daftar"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-foreground/60">
                Sudah punya akun?{' '}
                <Link 
                  to="/login" 
                  className="text-primary hover:underline font-medium"
                >
                  Login di sini
                </Link>
              </p>
              
              <p className="text-xs text-foreground/50">
                Dengan mendaftar, Anda menyetujui{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms & Conditions
                </a>{' '}
                dan{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="mt-6 crypto-card bg-accent/5 border-accent/20">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 text-accent">Yang Anda Dapatkan:</h4>
            <div className="text-sm text-foreground/70 space-y-1">
              <div>✓ Akses ke 150+ artikel premium</div>
              <div>✓ AI Chat expert 24/7</div>
              <div>✓ Update market analysis</div>
              <div>✓ Komunitas trader Indonesia</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;