import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/articles';
import { ArrowRight, BookOpen, MessageCircle, TrendingUp, Users, Star, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: 'Panduan Lengkap',
      description: '150+ artikel pembelajaran dari basic hingga advanced trading strategies',
      color: 'text-primary'
    },
    {
      icon: MessageCircle,
      title: 'AI Expert Chat',
      description: 'Tanya jawab dengan AI yang dilatih khusus untuk investasi cryptocurrency',
      color: 'text-accent'
    },
    {
      icon: Shield,
      title: 'Token Analyzer Pro',
      description: 'Analisis keamanan token kripto untuk mendeteksi honeypot dan risiko investasi',
      color: 'text-secondary'
    },
    {
      icon: TrendingUp,
      title: 'Analisis Market',
      description: 'Update terkini tentang tren pasar, analisis teknikal dan fundamental',
      color: 'text-secondary'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Bergabung dengan komunitas investor crypto Indonesia yang aktif',
      color: 'text-primary'
    }
  ];

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'Crypto Trader',
      content: 'CryptoWise membantu saya memahami dasar-dasar trading crypto. Sekarang portfolio saya sudah 300% profit!',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Sarah Amanda',
      role: 'Investor',
      content: 'AI chat feature-nya sangat membantu untuk konsultasi strategi investasi. Highly recommended!',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Rizky Pratama',
      role: 'Pemula',
      content: 'Artikel-artikelnya sangat mudah dipahami. Dari tidak tahu apa-apa jadi bisa trading sendiri.',
      rating: 5,
      avatar: '👨‍🎓'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Kenapa Pilih</span> CryptoWise?
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Platform learning terlengkap dengan fitur-fitur canggih untuk mendukung journey investasi crypto Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="crypto-card hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Kategori <span className="gradient-text">Pembelajaran</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Mulai journey Anda dengan memilih kategori yang sesuai dengan level dan minat Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="crypto-card hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/articles?category=${category.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl">{category.icon}</div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-foreground/70 mb-4">
                    Pelajari semua aspek tentang {category.name.toLowerCase()} dengan panduan lengkap dan mudah dipahami.
                  </p>
                  <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Mulai Belajar</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => navigate('/articles')}
              className="crypto-glow"
            >
              Lihat Semua Artikel
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Apa Kata <span className="gradient-text">Pengguna</span>?
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Ribuan investor telah mempercayai CryptoWise untuk mengembangkan skill trading mereka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="crypto-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-crypto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Siap Memulai Journey Investasi Crypto?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan dapatkan akses ke 150+ artikel premium, AI chat expert, dan komunitas trader Indonesia
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4"
              onClick={() => navigate('/register')}
            >
              Daftar Gratis Sekarang
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
              onClick={() => navigate('/chat')}
            >
              Coba AI Chat
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">₿</div>
                <span className="text-xl font-bold gradient-text">CryptoWise</span>
              </div>
              <p className="text-foreground/70 mb-4 max-w-md">
                Platform pembelajaran cryptocurrency terlengkap di Indonesia. 
                Dikembangkan oleh expert untuk membantu Anda menguasai dunia investasi digital.
              </p>
              <p className="text-sm text-foreground/50">
                © 2024 CryptoWise. Developed by Idin Iskandar
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <div className="space-y-2">
                <div><a href="/articles" className="text-foreground/70 hover:text-primary transition-colors">Artikel</a></div>
                <div><a href="/chat" className="text-foreground/70 hover:text-primary transition-colors">AI Chat</a></div>
                <div><a href="/about" className="text-foreground/70 hover:text-primary transition-colors">About</a></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <div className="text-foreground/70">Email: hello@cryptowise.id</div>
                <div className="text-foreground/70">WhatsApp: +62 812-3456-7890</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
