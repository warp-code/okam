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

  const chartData: ChartData<"line", (number | Point | null)[], unknown> = {
    labels: ["", "", "", "", "5", "", "", "", "", "", ""], // quantities go here
    datasets: [
      {
        data: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22], // buy prices go here
        borderColor: "#2ED3B7",
        label: "Buy price",
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        data: [1, 2, 3, 4, 9, 12, 16, 21, 35, 42, 56], // sell prices go here
        borderColor: "#FFFFFF",
        label: "Sell price",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

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
            value: 4,
            borderColor: "#333741",
            borderWidth: 1,
            label: {
              display: true,
              position: `${110}%`,
              xAdjust: 10,
              padding: 1,
              color: "#333741",
              content: "5",
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

  return <Line data={chartData} options={options} />;
}
