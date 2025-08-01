import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getPopularTokens, getTokenPriceHistory } from '@/lib/tokenAnalyzer';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';
import { TrendingUp, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TokenAnalyzer = () => {
  const [popularTokens, setPopularTokens] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPopularTokens();
  }, []);

  const handleTokenClick = async (token: any) => {
    setSelectedToken(token);
    setIsLoadingChart(true);
    try {
      const history = await getTokenPriceHistory(token.id);
      setPriceHistory(history);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load price chart",
        variant: "destructive",
      });
    } finally {
      setIsLoadingChart(false);
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

  const filteredTokens = popularTokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString()}`;
  };

  const formatPercentage = (percentage: number) => {
    const isPositive = percentage >= 0;
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const icon = isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;
    return (
      <span className={`flex items-center gap-1 ${color}`}>
        {icon}
        {Math.abs(percentage).toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Cryptocurrency Market</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore top 100 cryptocurrencies with real-time price charts and market data
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crypto Detail Page - CoinMarketCap Style */}
        {selectedToken && (
          <div className="max-w-7xl mx-auto mb-8">
            {/* Header Section */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedToken.image} 
                      alt={selectedToken.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h1 className="text-3xl font-bold">{selectedToken.name}</h1>
                      <div className="text-lg text-muted-foreground">{selectedToken.symbol.toUpperCase()}</div>
                    </div>
                    <div className="ml-4 px-3 py-1 bg-secondary rounded-full text-sm font-medium">
                      Rank #{selectedToken.market_cap_rank}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold mb-2">{formatPrice(selectedToken.current_price)}</div>
                    <div className="text-lg">
                      {formatPercentage(selectedToken.price_change_percentage_24h)}
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
                    <div className="text-xl font-semibold">
                      ${selectedToken.market_cap?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
                    <div className="text-xl font-semibold">
                      ${selectedToken.volume_24h?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Circulating Supply</div>
                    <div className="text-xl font-semibold">
                      {selectedToken.circulating_supply?.toLocaleString() || 'N/A'} {selectedToken.symbol.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Max Supply</div>
                    <div className="text-xl font-semibold">
                      {selectedToken.max_supply ? selectedToken.max_supply.toLocaleString() : '∞'} {selectedToken.symbol.toUpperCase()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedToken.name} to USD Chart</span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">7D</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingChart ? (
                  <div className="h-96 flex items-center justify-center">
                    <div className="animate-pulse">
                      <div className="text-muted-foreground">Loading price chart...</div>
                    </div>
                  </div>
                ) : priceHistory.length > 0 ? (
                  <div className="h-96">
                    <ChartContainer
                      config={{
                        price: {
                          label: "Price (USD)",
                          color: "hsl(var(--primary))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <XAxis 
                            dataKey="date" 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            interval="preserveStartEnd"
                          />
                          <YAxis 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value < 1 ? value.toFixed(4) : value.toLocaleString()}`}
                            domain={['dataMin', 'dataMax']}
                          />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1 }}
                            labelStyle={{ color: "hsl(var(--foreground))" }}
                            contentStyle={{ 
                              backgroundColor: "hsl(var(--popover))", 
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ 
                              r: 6, 
                              fill: "hsl(var(--primary))",
                              stroke: "hsl(var(--background))",
                              strokeWidth: 3
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-muted-foreground">No chart data available</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Popular Tokens */}
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Top 100 Cryptocurrencies
              </CardTitle>
              <CardDescription>
                Click on any cryptocurrency to view its real-time price chart
              </CardDescription>
            </CardHeader>
            <CardContent>
              {popularTokens.length > 0 ? (
                <div className="space-y-2">
                  {filteredTokens.map((token) => (
                    <Card 
                      key={token.id} 
                      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
                      onClick={() => handleTokenClick(token)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="text-sm font-medium text-muted-foreground w-8">
                            #{token.market_cap_rank}
                          </div>
                          <img 
                            src={token.image} 
                            alt={token.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="font-semibold">{token.name}</div>
                            <div className="text-sm text-muted-foreground">{token.symbol.toUpperCase()}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{formatPrice(token.current_price)}</div>
                            <div className="text-sm">
                              {formatPercentage(token.price_change_percentage_24h)}
                            </div>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>Market Cap</div>
                            <div className="font-medium">
                              ${token.market_cap?.toLocaleString() || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-muted-foreground">Loading cryptocurrencies...</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TokenAnalyzer;