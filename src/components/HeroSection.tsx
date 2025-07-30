import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const cryptoLogos = [
    { name: 'Bitcoin', symbol: '₿', color: 'text-primary' },
    { name: 'Ethereum', symbol: 'Ξ', color: 'text-accent' },
    { name: 'Cardano', symbol: '₳', color: 'text-secondary' },
    { name: 'Solana', symbol: '◎', color: 'text-primary' },
    { name: 'Polygon', symbol: '⬟', color: 'text-accent' },
    { name: 'Chainlink', symbol: '🔗', color: 'text-secondary' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Floating Crypto Symbols */}
          <div className="mb-8 flex justify-center items-center space-x-6 flex-wrap">
            {cryptoLogos.map((crypto, index) => (
              <div 
                key={crypto.name}
                className={`text-4xl ${crypto.color} floating-animation opacity-70 hover:opacity-100 transition-opacity cursor-pointer`}
                style={{animationDelay: `${index * 0.3}s`}}
                title={crypto.name}
              >
                {crypto.symbol}
              </div>
            ))}
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 slide-up">
            <span className="gradient-text">Kuasai</span>
            <br />
            <span className="text-foreground">Investasi Crypto</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto slide-up" style={{animationDelay: '0.2s'}}>
            Platform pembelajaran cryptocurrency terlengkap dengan panduan expert, 
            analisis mendalam, dan AI assistant untuk membantu journey investasi Anda.
          </p>

          {/* Features */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-12 slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center space-x-2 text-foreground/60">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>150+ Artikel Premium</span>
            </div>
            <div className="flex items-center space-x-2 text-foreground/60">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>AI Trading Assistant</span>
            </div>
            <div className="flex items-center space-x-2 text-foreground/60">
              <Shield className="h-5 w-5 text-secondary" />
              <span>Expert Verified</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 slide-up" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg"
              className="crypto-glow text-lg px-8 py-4 group"
              onClick={() => navigate('/articles')}
            >
              Mulai Belajar
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-primary/30 hover:border-primary"
              onClick={() => navigate('/chat')}
            >
              Tanya AI Expert
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto slide-up" style={{animationDelay: '0.8s'}}>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">150+</div>
              <div className="text-foreground/60">Artikel Pembelajaran</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-foreground/60">AI Assistant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-foreground/60">Gratis Akses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;