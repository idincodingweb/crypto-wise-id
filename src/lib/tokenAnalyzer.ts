import axios from 'axios';

const rapidApiKey = '4e47b12293mshc3f65f7fe7805e5p1e21f3jsn311b011168eb';
const baseUrl = 'https://token-scanner-multichain-honeypot-checker-multichain.p.rapidapi.com';

export interface TokenAnalysisResult {
  isHoneypot: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  liquidityLocked: boolean;
  ownershipDistribution: {
    owner: number;
    top10: number;
    others: number;
  };
  tokenInfo: {
    name: string;
    symbol: string;
    totalSupply: string;
    decimals: number;
  };
  securityScore: number;
}

export const analyzeToken = async (contractAddress: string, chain: string = 'bsc'): Promise<TokenAnalysisResult> => {
  try {
    const options = {
      method: 'GET',
      url: `${baseUrl}/scan_token`,
      params: {
        token_address: contractAddress,
        chain: chain
      },
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'token-scanner-multichain-honeypot-checker-multichain.p.rapidapi.com'
      }
    };

    console.log('Making API request with options:', options);
    const response = await axios.request(options);
    console.log('API Response:', response.data);
    
    if (response.status === 200 && response.data) {
      // Transform API response to our format
      const data = response.data;
      
      return {
        isHoneypot: data.is_honeypot || data.isHoneypot || false,
        riskLevel: determineRiskLevel(data),
        liquidityLocked: data.liquidity_locked || data.liquidityLocked || false,
        ownershipDistribution: {
          owner: data.owner_percentage || data.ownerPercentage || 0,
          top10: data.top_10_holders_percentage || data.top10HoldersPercentage || 0,
          others: 100 - (data.owner_percentage || data.ownerPercentage || 0) - (data.top_10_holders_percentage || data.top10HoldersPercentage || 0)
        },
        tokenInfo: {
          name: data.token_name || data.tokenName || data.name || 'Unknown Token',
          symbol: data.token_symbol || data.tokenSymbol || data.symbol || 'UNKNOWN',
          totalSupply: data.total_supply || data.totalSupply || data.supply || '0',
          decimals: data.decimals || 18
        },
        securityScore: calculateSecurityScore(data)
      };
    }
    
    throw new Error('Invalid response from API');
  } catch (error) {
    console.error('Error analyzing token:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.response?.status === 404) {
        throw new Error('Token not found. Please check the contract address.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid contract address format.');
      }
    }
    throw new Error('Failed to analyze token. Please check the contract address and try again.');
  }
};

const determineRiskLevel = (data: any): 'low' | 'medium' | 'high' => {
  if (data.is_honeypot) return 'high';
  if (!data.liquidity_locked || (data.owner_percentage > 50)) return 'high';
  if (data.owner_percentage > 20) return 'medium';
  return 'low';
};

const calculateSecurityScore = (data: any): number => {
  let score = 100;
  
  if (data.is_honeypot) score -= 50;
  if (!data.liquidity_locked) score -= 20;
  if (data.owner_percentage > 50) score -= 20;
  if (data.owner_percentage > 20) score -= 10;
  
  return Math.max(0, score);
};

export const getPopularTokens = async () => {
  try {
    // Using CoinGecko API for top 100 tokens
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });

    return response.data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap_rank: coin.market_cap_rank,
      market_cap: coin.market_cap,
      price_change_percentage_24h: coin.price_change_percentage_24h || 0,
      volume_24h: coin.total_volume
    }));
  } catch (error) {
    console.error('Error fetching popular tokens:', error);
    return [];
  }
};

export const getTokenPriceHistory = async (coinId: string) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '7',
        interval: 'hourly'
      }
    });

    const prices = response.data.prices || [];
    return prices.map((price: any) => ({
      date: new Date(price[0]).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit'
      }),
      price: price[1]
    }));
  } catch (error) {
    console.error('Error fetching price history:', error);
    return [];
  }
};

// Helper function for known contract addresses
const getKnownContractAddress = (symbol: string): string => {
  const knownContracts: { [key: string]: string } = {
    'BNB': '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB on BSC
    'USDT': '0x55d398326f99059fF775485246999027B3197955', // USDT on BSC
    'BUSD': '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD on BSC
    'USDC': '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // USDC on BSC
    // Add more known contract addresses as needed
  };
  
  return knownContracts[symbol] || '';
};