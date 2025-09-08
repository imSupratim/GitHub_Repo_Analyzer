import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ContributorsChart = ({ fullName }) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${fullName}/contributors?per_page=10`
        );
        const data = await response.json();
        setContributors(data);
      } catch (err) {
        console.error("Error fetching contributors:", err);
      }
    };

    if (fullName) fetchContributors();
  }, [fullName]);

  if (!contributors.length)
    return (
      <p className="text-center text-gray-600 italic p-4">
        No contributor data available.
      </p>
    );

  // Generate colors for each contributor
  const colors = [
    "#4BC0C0",
    "#36A2EB",
    "#FF6384",
    "#FF9F40",
    "#9966FF",
    "#FFCD56",
    "#2ecc71",
    "#e74c3c",
    "#f1c40f",
    "#3498db",
  ];

  const data = {
    labels: contributors.map((c) => c.login),
    datasets: [
      {
        label: "Commits",
        data: contributors.map((c) => c.contributions),
        backgroundColor: contributors.map((_, i) => colors[i % colors.length]),
        borderRadius: 6, // rounded bars
      },
    ],
  };

  return (
    <div className="my-6 bg-white shadow-lg p-6 rounded-2xl w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Top Contributors
      </h3>
      <div className="h-[300px] sm:h-[400px]">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // hides legend since it's just "Commits"
              },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.formattedValue} commits by ${context.label}`,
                },
              },
            },
            scales: {
              x: {
                ticks: { color: "#374151", font: { size: 12 } },
              },
              y: {
                ticks: { stepSize: 1, color: "#374151", font: { size: 12 } },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ContributorsChart;
