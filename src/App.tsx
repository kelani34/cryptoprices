import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinsSummary from "./components/CoinsSummary";
import { Coins } from "./types/Types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [coins, setCoins] = useState<Coins[] | null>();
  const [selected, setSelected] = useState<Coins | null>();
  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });
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
            axios
              .get(
                `https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=usd&days=30
            `
              )
              .then((res) => {
                console.log(res.data);
                setData({
                  labels: res.data.prices.map((x: number[]) => x[0]),
                  datasets: [
                    {
                      label: "Dataset 1",
                      data: res.data.prices.map((x: number[]) => x[1]),
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                });
              });
          }}
          defaultValue="default"
        >
          <option value="default">Select a coin</option>
          {coins
            ? coins.map((coin) => {
                return (
                  <option key={coin.id} value={coin.id}>
                    {coin.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {selected ? <CoinsSummary coin={selected} /> : null}
      {data ? (
        <div style={{ width: "700px" }}>
          <Line data={data} options={options} />
        </div>
      ) : null}
    </>
  );
}

export default App;
