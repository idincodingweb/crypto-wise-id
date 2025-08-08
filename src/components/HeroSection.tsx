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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Modern Background with Orbs */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Large Floating Orbs */}
      <div className="absolute inset-0">
        <div className="hero-orb w-96 h-96 top-20 -left-20" style={{animationDelay: '0s'}}></div>
        <div className="hero-orb w-80 h-80 top-1/2 -right-20" style={{animationDelay: '2s'}}></div>
        <div className="hero-orb w-72 h-72 bottom-20 left-1/4" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 20px 20px, hsl(212 100% 65%) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Central Orb with Bitcoin Symbol */}
          <div className="relative mb-12 flex justify-center">
            <div className="relative">
              {/* Main Central Orb */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-orb flex items-center justify-center relative pulse-orb">
                <div className="rotating-border absolute inset-0 rounded-full"></div>
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-card/20 backdrop-blur-xl border border-primary/30 flex items-center justify-center">
                  <span className="text-6xl md:text-7xl text-primary font-bold">₿</span>
                </div>
              </div>
              
              {/* Floating Crypto Symbols around the orb */}
              <div className="absolute inset-0">
                {cryptoLogos.map((crypto, index) => (
                  <div 
                    key={crypto.name}
                    className={`absolute w-12 h-12 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 flex items-center justify-center ${crypto.color} floating-orb transition-all hover:scale-110 cursor-pointer`}
                    style={{
                      animationDelay: `${index * 0.5}s`,
                      top: `${15 + 30 * Math.cos((index * 60) * Math.PI / 180)}%`,
                      left: `${50 + 40 * Math.sin((index * 60) * Math.PI / 180)}%`,
                      transform: `translate(-50%, -50%)`
                    }}
                    title={crypto.name}
                  >
                    <span className="text-lg font-semibold">{crypto.symbol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 slide-up font-space-grotesk">
            <span className="gradient-text">Kuasai</span>
            <br />
            <span className="text-foreground">Investasi Crypto</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-12 max-w-4xl mx-auto slide-up font-light leading-relaxed" style={{animationDelay: '0.2s'}}>
            Platform pembelajaran cryptocurrency terlengkap dengan panduan expert, 
            analisis mendalam, dan AI assistant untuk membantu journey investasi Anda.
          </p>

          {/* Enhanced Features */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 mb-16 slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center space-x-3 bg-card/40 backdrop-blur-sm px-6 py-3 rounded-full border border-border/30">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-foreground font-medium">150+ Artikel Premium</span>
            </div>
            <div className="flex items-center space-x-3 bg-card/40 backdrop-blur-sm px-6 py-3 rounded-full border border-border/30">
              <TrendingUp className="h-6 w-6 text-accent" />
              <span className="text-foreground font-medium">AI Trading Assistant</span>
            </div>
            <div className="flex items-center space-x-3 bg-card/40 backdrop-blur-sm px-6 py-3 rounded-full border border-border/30">
              <Shield className="h-6 w-6 text-secondary" />
              <span className="text-foreground font-medium">Expert Verified</span>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 slide-up" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg"
              className="crypto-glow text-lg px-10 py-5 group bg-gradient-primary hover:bg-gradient-secondary transition-all duration-500 font-semibold rounded-xl"
              onClick={() => navigate('/articles')}
            >
              Mulai Belajar
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-10 py-5 border-2 border-primary/50 hover:border-primary bg-card/20 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300 rounded-xl font-semibold"
              onClick={() => navigate('/chat')}
            >
              Tanya AI Expert
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto slide-up" style={{animationDelay: '0.8s'}}>
            <div className="text-center group">
              <div className="crypto-card p-8 hover:scale-105 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 font-space-grotesk">150+</div>
                <div className="text-foreground/70 text-lg font-medium">Artikel Pembelajaran</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="crypto-card p-8 hover:scale-105 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 font-space-grotesk">24/7</div>
                <div className="text-foreground/70 text-lg font-medium">AI Assistant</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="crypto-card p-8 hover:scale-105 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 font-space-grotesk">100%</div>
                <div className="text-foreground/70 text-lg font-medium">Gratis Akses</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center bg-card/20 backdrop-blur-sm">
          <div className="w-2 h-4 bg-gradient-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;