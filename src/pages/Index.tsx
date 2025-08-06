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

      {/* Enhanced Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Orb */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-orb opacity-20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-space-grotesk">
              <span className="gradient-text">Kenapa Pilih</span> CryptoWise?
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Platform learning terlengkap dengan fitur-fitur canggih untuk mendukung journey investasi crypto Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="crypto-card group cursor-pointer">
                <CardContent className="p-8 text-center relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-orb mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                    <feature.icon className={`h-10 w-10 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Preview */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-card/10 relative">
        {/* Background Elements */}
        <div className="absolute top-40 left-10 w-80 h-80 bg-gradient-secondary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-orb opacity-15 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-space-grotesk">
              Kategori <span className="gradient-text">Pembelajaran</span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Mulai journey Anda dengan memilih kategori yang sesuai dengan level dan minat Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="crypto-card cursor-pointer group relative overflow-hidden"
                onClick={() => navigate(`/articles?category=${category.id}`)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-5xl">{category.icon}</div>
                    <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
                    Pelajari semua aspek tentang {category.name.toLowerCase()} dengan panduan lengkap dan mudah dipahami.
                  </p>
                  <div className="flex items-center text-primary group-hover:translate-x-3 transition-transform duration-300">
                    <span className="font-medium">Mulai Belajar</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => navigate('/articles')}
              className="crypto-glow text-lg px-10 py-5 bg-gradient-primary hover:bg-gradient-secondary transition-all duration-500 font-semibold rounded-xl"
            >
              Lihat Semua Artikel
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Orb */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-orb opacity-10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-space-grotesk">
              Apa Kata <span className="gradient-text">Pengguna</span>?
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Ribuan investor telah mempercayai CryptoWise untuk mengembangkan skill trading mereka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="crypto-card group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-orb flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-all duration-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{testimonial.name}</h4>
                      <p className="text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-orb opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-secondary opacity-20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white font-space-grotesk">
            Siap Memulai Journey Investasi Crypto?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Daftar sekarang dan dapatkan akses ke 150+ artikel premium, AI chat expert, dan komunitas trader Indonesia
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <Button 
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-5 bg-white text-primary hover:bg-white/90 transition-all duration-300 font-semibold rounded-xl shadow-2xl"
              onClick={() => navigate('/register')}
            >
              Daftar Gratis Sekarang
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-10 py-5 border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-300 rounded-xl font-semibold backdrop-blur-sm"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
