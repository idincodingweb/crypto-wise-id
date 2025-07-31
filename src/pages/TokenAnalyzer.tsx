import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { analyzeToken, getPopularTokens, TokenAnalysisResult } from '@/lib/tokenAnalyzer';
import { Search, Shield, AlertTriangle, CheckCircle, TrendingUp, Lock, Users, PieChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const TokenAnalyzer = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [selectedChain, setSelectedChain] = useState('bsc');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<TokenAnalysisResult | null>(null);
  const [popularTokens, setPopularTokens] = useState<any[]>([]);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!contractAddress.trim()) {
      toast({
        title: "Error",
        description: "Masukkan alamat kontrak token yang valid",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeToken(contractAddress, selectedChain);
      setAnalysisResult(result);
      toast({
        title: "Analisis Selesai",
        description: "Token berhasil dianalisis!",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menganalisis token",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadPopularTokens = async () => {
    try {
      const tokens = await getPopularTokens();
      setPopularTokens(tokens);
    } catch (error) {
      console.error('Failed to load popular tokens:', error);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-5 w-5" />;
      case 'medium': return <AlertTriangle className="h-5 w-5" />;
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Token Analyzer Pro</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Analisis keamanan token kripto untuk mendeteksi risiko, honeypot, dan data likuiditas
          </p>
        </div>

        {/* Search Section */}
        <Card className="crypto-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Analisis Token
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              {['bsc', 'ethereum', 'polygon'].map((chain) => (
                <Button
                  key={chain}
                  variant={selectedChain === chain ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedChain(chain)}
                  className="capitalize"
                >
                  {chain === 'bsc' ? 'BSC' : chain}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Masukkan alamat kontrak token (0x...)"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="crypto-glow min-w-[120px]"
              >
                {isAnalyzing ? 'Menganalisis...' : 'Analisis'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6 mb-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Security Score */}
                <Card className="crypto-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security Score
                      </h3>
                      <Badge className={`${getRiskColor(analysisResult.riskLevel)} flex items-center gap-1`}>
                        {getRiskIcon(analysisResult.riskLevel)}
                        {analysisResult.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Security Score</span>
                        <span className="font-semibold">{analysisResult.securityScore}/100</span>
                      </div>
                      <Progress value={analysisResult.securityScore} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className={`crypto-card ${analysisResult.isHoneypot ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className={`h-8 w-8 mx-auto mb-2 ${analysisResult.isHoneypot ? 'text-red-600' : 'text-green-600'}`} />
                      <h4 className="font-semibold">Honeypot Status</h4>
                      <p className={`text-sm ${analysisResult.isHoneypot ? 'text-red-600' : 'text-green-600'}`}>
                        {analysisResult.isHoneypot ? 'DETECTED' : 'SAFE'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className={`crypto-card ${analysisResult.liquidityLocked ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <CardContent className="p-4 text-center">
                      <Lock className={`h-8 w-8 mx-auto mb-2 ${analysisResult.liquidityLocked ? 'text-green-600' : 'text-red-600'}`} />
                      <h4 className="font-semibold">Liquidity</h4>
                      <p className={`text-sm ${analysisResult.liquidityLocked ? 'text-green-600' : 'text-red-600'}`}>
                        {analysisResult.liquidityLocked ? 'LOCKED' : 'UNLOCKED'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="crypto-card">
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">Owner Share</h4>
                      <p className="text-sm text-foreground/70">{analysisResult.ownershipDistribution.owner}%</p>
                    </CardContent>
                  </Card>

                  <Card className="crypto-card">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">Top 10 Holders</h4>
                      <p className="text-sm text-foreground/70">{analysisResult.ownershipDistribution.top10}%</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Token Info */}
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle>Token Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-foreground/60">Name</p>
                      <p className="font-semibold">{analysisResult.tokenInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Symbol</p>
                      <p className="font-semibold">{analysisResult.tokenInfo.symbol}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Total Supply</p>
                      <p className="font-semibold">{analysisResult.tokenInfo.totalSupply}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">Decimals</p>
                      <p className="font-semibold">{analysisResult.tokenInfo.decimals}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced">
                <Card className="crypto-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Ownership Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Owner</span>
                        <span className="font-semibold">{analysisResult.ownershipDistribution.owner}%</span>
                      </div>
                      <Progress value={analysisResult.ownershipDistribution.owner} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span>Top 10 Holders</span>
                        <span className="font-semibold">{analysisResult.ownershipDistribution.top10}%</span>
                      </div>
                      <Progress value={analysisResult.ownershipDistribution.top10} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span>Others</span>
                        <span className="font-semibold">{analysisResult.ownershipDistribution.others}%</span>
                      </div>
                      <Progress value={analysisResult.ownershipDistribution.others} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Popular Tokens */}
        <Card className="crypto-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Popular Tokens
            </CardTitle>
            <Button variant="outline" onClick={loadPopularTokens}>
              Load Popular Tokens
            </Button>
          </CardHeader>
          <CardContent>
            {popularTokens.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {popularTokens.slice(0, 10).map((token) => (
                  <Card 
                    key={token.id} 
                    className="crypto-card cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => token.contract_address && setContractAddress(token.contract_address)}
                  >
                    <CardContent className="p-4 text-center">
                      <img src={token.image} alt={token.name} className="w-8 h-8 mx-auto mb-2" />
                      <h4 className="font-semibold text-sm">{token.symbol}</h4>
                      <p className="text-xs text-foreground/60 truncate">{token.name}</p>
                      <p className="text-xs text-primary">${token.current_price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-foreground/60">
                Klik "Load Popular Tokens" untuk melihat daftar token populer
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenAnalyzer;