export type Coins = {
  ath: number;
  atl: number;
  current_price: number;
  id: string;
  name: string;
  symbol: string;
  high_24h: number;
  low_24h: number;
  owned: number;
};

export type AppProp = {
  coin: Coins;
  updateOwned: (coin: Coins, amount: number) => void;
};
