import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const LanguagesChart = ({ languages }) => {
  if (!languages || Object.keys(languages).length === 0) {
    return (
      <p className="text-center text-gray-600 italic p-4">
        ⚠ No language data available.
      </p>
    );
  }

  const data = {
    labels: Object.keys(languages),
    datasets: [
      {
        data: Object.values(languages),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div className="my-6  bg-white shadow-lg p-6 rounded-2xl w-full max-w-xl mx-auto dark:border">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center  ">
        🌐 Languages Usage
      </h3>
      <div className="h-[300px] sm:h-[400px] flex justify-center ">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#374151", // dark mode handled by Tailwind
                  font: { size: 13 },
                  usePointStyle: true,
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || "";
                    const value = context.raw || 0;
                    return `${label}: ${value} bytes`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LanguagesChart;
