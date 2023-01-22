import React, { useEffect } from "react";
import axios from "axios";
function App() {
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
      
  });
  return (
    <div className="App">
      <div>hello</div>
    </div>
  );
}

export default App;
