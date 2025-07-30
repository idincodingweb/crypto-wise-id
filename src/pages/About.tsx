import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Bitcoin, Globe, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Tentang <span className="gradient-text">CryptoWise</span>
            </h1>
            <p className="text-xl text-foreground/70">
              Platform pembelajaran cryptocurrency terpercaya di Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="crypto-card">
              <CardContent className="p-6">
                <Bitcoin className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Misi Kami</h3>
                <p className="text-foreground/70">
                  Mendemokratisasi akses edukasi cryptocurrency dan membantu investor Indonesia 
                  memahami dunia digital assets dengan cara yang aman dan bertanggung jawab.
                </p>
              </CardContent>
            </Card>

            <Card className="crypto-card">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-3">Visi Kami</h3>
                <p className="text-foreground/70">
                  Menjadi platform edukasi crypto #1 di Indonesia yang dipercaya oleh 
                  jutaan investor untuk mengembangkan pengetahuan dan skill trading mereka.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="crypto-card mb-12">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Tentang Developer</h2>
              </div>
              
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground">
                  II
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Idin Iskandar</h3>
                  <p className="text-lg text-primary mb-4">Full Stack Developer & Crypto Enthusiast</p>
                  
                  <div className="space-y-3 text-foreground/70">
                    <p>
                      Seorang developer berpengalaman dengan passion di bidang cryptocurrency dan blockchain technology. 
                      Telah berkecimpung di dunia crypto sejak 2018 dan aktif trading serta investing.
                    </p>
                    
                    <p>
                      Memiliki pengalaman mengembangkan berbagai aplikasi web dan mobile, 
                      serta deep understanding tentang teknologi blockchain dan DeFi ecosystem.
                    </p>
                    
                    <p>
                      Menciptakan CryptoWise dengan tujuan sharing knowledge dan membantu 
                      investor Indonesia untuk lebih memahami dunia cryptocurrency.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">TypeScript</span>
                    <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">Blockchain</span>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">DeFi</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="crypto-card text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">1000+</h4>
                <p className="text-sm text-foreground/70">Active Users</p>
              </CardContent>
            </Card>
            
            <Card className="crypto-card text-center">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-accent mx-auto mb-3" />
                <h4 className="font-semibold mb-2">150+</h4>
                <p className="text-sm text-foreground/70">Premium Articles</p>
              </CardContent>
            </Card>
            
            <Card className="crypto-card text-center">
              <CardContent className="p-6">
                <Bitcoin className="h-8 w-8 text-secondary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">24/7</h4>
                <p className="text-sm text-foreground/70">AI Support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;