import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinsSummary from "./components/CoinsSummary";
import { Coins } from "./types/Types";

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
            return <CoinsSummary coin={coin} />;
          })
        : null}
    </div>
  );
}

export default App;
