export interface Coin  {
  id: string,
  name: string,
  symbol: string,
  image: {
    large: string,
    thumb: string,
    small: string,
  },
  current_price: number,
  market_cap: number,
  market_cap_rank: number;
  price_change_percentage_24h: number;
  description: {
    en: string
  };
}

export const defaultCoin: Coin = {
  current_price: 0,
  id: "",
  image: {
    thumb: "",
    small: "",
    large: ""
  },
  market_cap: 0,
  name: "",
  market_cap_rank: 0,
  price_change_percentage_24h: 0,
  symbol: "",
  description: {
    en: "",
  }
}
