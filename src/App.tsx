import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinsSummary from "./components/CoinsSummary";
import { Coins } from "./types/Types";

function App() {
  const [coins, setCoins] = useState<Coins[] | null>();
  const [selected, setSelected] = useState<Coins | null>();
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

    axios.get(url).then((res) => {
      setCoins(res.data);
    });
  }, []);
  return (
    <>
      <div className="App">
        <select
          onChange={(e) => {
            const c = coins?.find((x) => x.id === e.target.value);
            setSelected(c);
          }}
          defaultValue="default"
        >
          <option value="default">Select a coin</option>
          {coins
            ? coins.map((coin) => {
                return (
                  <option key={coin.id} value={coin.id}>
                    {" "}
                    {coin.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {selected ? <CoinsSummary coin={selected} /> : null}
    </>
  );
}

export default App;
