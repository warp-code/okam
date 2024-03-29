import {
  calculateBuyPrice,
  calculateSellPrice,
} from "@/utils/actions/clientActions";
import {
  ChartData,
  Point,
  ChartOptions,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function DatasetChart({
  currentSupply,
  quadraticParam,
  linearParam,
  constantParam,
}: {
  currentSupply: number;
  quadraticParam: number;
  linearParam: number;
  constantParam: number;
}) {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    annotationPlugin
  );

  const [chartData, setChartData] =
    useState<ChartData<"line", (number | Point | null)[], unknown>>();

  const calculateQuantities = (currentSupply: number) => {
    const datapointIncrement = currentSupply / 5;

    const datapoints: number[] = [];

    for (let i = 0; i <= 8; i++) {
      datapoints.push(datapointIncrement * i);
    }

    return datapoints;
  };

  useEffect(() => {
    const datapoints = calculateQuantities(currentSupply);

    const buyPrices: number[] = [];
    const sellPrices: number[] = [];

    for (const datapoint of datapoints) {
      const buyPrice = calculateBuyPrice(
        quadraticParam,
        linearParam,
        constantParam,
        datapoint
      );

      const sellPrice = calculateSellPrice(buyPrice);

      buyPrices.push(buyPrice);
      sellPrices.push(sellPrice);
    }

    console.log("quantities: ", datapoints);
    console.log("buy prices:", buyPrices);
    console.log("sell prices:", sellPrices);

    const labels = datapoints.map((x) => x.toString);

    setChartData({
      labels: labels,
      datasets: [
        {
          data: buyPrices,
          borderColor: "#2ED3B7",
          label: "Buy price",
          borderWidth: 1,
          pointRadius: 0,
        },
        {
          data: sellPrices,
          borderColor: "#FFFFFF",
          label: "Sell price",
          borderWidth: 1,
          pointRadius: 0,
        },
      ],
    });
  }, [currentSupply, quadraticParam, linearParam, constantParam]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: "#131615",
    color: "#333741",
    borderColor: "#333741",
    scales: {
      x: {
        grid: {
          color: "transparent",
        },
        ticks: {
          display: false,
          color: "#333741",
          precision: 0,
        },
      },
      y: {
        grid: {
          color: "#333741",
        },
        ticks: {
          precision: 0,
          color: "#333741",
          font: {
            lineHeight: "18px",
            size: 12,
          },
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: [
          {
            type: "line",
            scaleID: "x",
            value: 5,
            borderColor: "#333741",
            borderWidth: 1,
            label: {
              display: true,
              position: "start",
              xAdjust: -12,
              padding: 1,
              color: "#333741",
              content: `${currentSupply}`,
              backgroundColor: "transparent",
              font: {
                lineHeight: "18px",
                size: 12,
              },
            },
          },
        ],
      },
    },
  };

  return <>{chartData && <Line data={chartData} options={options} />}</>;
}
