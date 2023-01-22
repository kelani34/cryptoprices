import React, { useEffect, useState } from "react";
import axios from "axios";

export type Coins = {
  ath: number;
  atl: number;
  current_price: number;
  id: string;
  name: string;
  symbol: string;
  high_24h: number;
  low_24h: number;
};
function App() {
  const [coins, setCoins] = useState<Coins[] | null>();
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

    axios.get(url).then((res) => {
      setCoins(res.data);
    });
  }, []);
  return (
    <div className="App">
      {coins
        ? coins.map((coin) => {
            return (
              <p>{`${coin.name} | ${coin.symbol} | ${coin.current_price} `}</p>
            );
          })
        : null}
    </div>
  );
}

export default App;
