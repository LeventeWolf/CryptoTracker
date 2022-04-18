export interface Coin  {
  id: string,
  name: string,
  symbol: string,
  image: {
    large: string,
    thumb: string,
    small: string,
  },
  market_data: {
    current_price: {usd: number},
    market_cap: {usd: number},
    price_change_percentage_24h: {usd: number},
  },
  market_cap_rank: number;
  description: {
    en: string
  };
}

export const defaultCoin: Coin = {
  id: "",
  image: {
    thumb: "",
    small: "",
    large: ""
  },
  market_data: {
    current_price: {usd: 0},
    market_cap: {usd: 0},
    price_change_percentage_24h: {usd: 0},
  },
  name: "",
  market_cap_rank: 0,
  symbol: "",
  description: {
    en: "",
  }
}
