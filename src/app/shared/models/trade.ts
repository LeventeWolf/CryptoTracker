export interface Trade {
  id: string,
  userID: string,
  cryptoID: string,
  currencyAmount: number,
  coinAmount: number,
  action: 'limit' | 'market',
  type: 'buy' | 'sell',
  date: string,
  price: number,
  status: 'filled' | 'waiting',
  dateLimit: {
    targetDate: string | undefined,
    targetTime: string | undefined,
  },
  limit: {
    targetPrice: number
  }
}
