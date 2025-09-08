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

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CommitsChart = ({ fullName }) => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${fullName}/commits?per_page=10`
        );
        const data = await response.json();
        setCommits(data);
      } catch (err) {
        console.error("Error fetching commits:", err);
      }
    };

    if (fullName) fetchCommits();
  }, [fullName]);

  if (!commits.length)
    return (
      <p className="text-center text-gray-600 italic p-4">
        No commit data available.
      </p>
    );

  const data = {
    labels: commits.map((c) => c.commit.author.name),
    datasets: [
      {
        label: "Commits",
        data: commits.map(() => 1), // Each commit = 1
        backgroundColor: "#36A2EB",
        borderRadius: 6, // rounded bars
      },
    ],
  };

  return (
    <div className="my-6 bg-white shadow-lg p-6 rounded-2xl w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Recent Commits
      </h3>
      <div className="h-[300px] sm:h-[400px]">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // hide legend since only 1 dataset
              },
              tooltip: {
                callbacks: {
                  label: (context) => `Commit by ${context.label}`,
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

export default CommitsChart;
