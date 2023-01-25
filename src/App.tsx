import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinsSummary from "./components/CoinsSummary";
import { Coins } from "./types/Types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import moment from "moment";
ChartJS.register(Tooltip, Legend, ArcElement);

function App() {
  const [coins, setCoins] = useState<Coins[] | null>();
  const [selected, setSelected] = useState<Coins[]>([]);
  const [data, setData] = useState<ChartData<"pie">>();
  const [range, setRange] = useState<number>(30);
  // const [options, setOptions] = useState<ChartOptions<"line">>({});
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

    axios.get(url).then((res) => {
      setCoins(res.data);
    });
  }, []);

  // useEffect(() => {
  //   if (!selected) return;
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/coins/${
  //         selected?.id
  //       }/market_chart?vs_currency=usd&days=${range}&interval=${
  //         range === 1 ? "hourly" : "daily"
  //       }
  //           `
  //     )
  //     .then((res) => {
  //       setData({
  //         labels: res.data.prices.map((x: number[]) =>
  //           moment.unix(x[0] / 1000).format(range === 1 ? "HH:MM" : "MM-DD")
  //         ),
  //         datasets: [
  //           {
  //             label: "Dataset 1",
  //             data: res.data.prices.map((x: number[]) => x[1]),
  //             borderColor: "rgb(255, 99, 132)",
  //             backgroundColor: "rgba(255, 99, 132, 0.5)",
  //           },
  //         ],
  //       });
  //     });
  //   setOptions({
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //       title: {
  //         display: true,
  //         text: `Last price of ${selected?.id} in the last ${
  //           range === 1 ? " 24 Hours" : `${range} Days`
  //         }`,
  //       },
  //     },
  //   });
  // }, [selected, range]);

  useEffect(() => {
    console.log("selected", selected);
    if (selected.length === 0) return;
    setData({
      labels: selected.map((label) => label.name),
      datasets: [
        {
          label: "# of Votes",
          data: selected.map((label) => label.owned * label.current_price),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [selected]);

  function updateOwned(coin: Coins, amount: number): void {
    const coinTemp = [...selected];
    const coinTempObj = coinTemp.find((c) => c.id === coin.id);
    if (coinTempObj) {
      coinTempObj.owned = amount;
      setSelected(coinTemp);
    }
  }
  return (
    <>
      <div className="App">
        <select
          onChange={(e) => {
            const c = coins?.find((x) => x.id === e.target.value) as Coins;
            setSelected([...selected, c]);
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
        {/* <select
          onChange={(e) => {
            setRange(parseInt(e.target.value));
          }}
          defaultValue="30"
        >
          <option value={30}>30 days</option>
          <option value={7}>7 days </option>
          <option value={1}> 1 day</option>
        </select> */}
      </div>
      {selected.map((s) => (
        <CoinsSummary updateOwned={updateOwned} coin={s} />
      ))}
      {/* {selected ? <CoinsSummary coin={selected} /> : null} */}
      {data ? (
        <div style={{ width: "700px" }}>
          <Pie data={data} />
        </div>
      ) : null}

      {selected
        ? "Your Coins are worth $" +
          selected
            .map((s) => {
              if (isNaN(s.owned)) {
                return 0;
              }
              return s.current_price * s.owned;
            })
            .reduce((prev, curr) => {
              return prev + curr;
            }, 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        : null}
    </>
  );
}

export default App;
