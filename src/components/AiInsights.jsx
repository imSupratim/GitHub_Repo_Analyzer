import React, { useState } from "react";

function AiInsights({ repodata, languages, contributors }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    setInsight("");

    try {
      const response = await fetch("https://github-repo-analyzer-backend-r7yg.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repodata, languages, contributors }),
      });

      const data = await response.json();
      setInsight(data.insight || "No insights generated.");
    } catch (error) {
      console.error("Error generating insights:", error);
      setInsight("⚠ Failed to generate insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 mt-6 transition-colors duration-500
      bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700
      backdrop-blur-md`}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🤖 AI Insights
      </h2>

      <button
        onClick={generateInsights}
        disabled={loading}
        className="px-5 py-3 rounded-lg font-semibold transition-all duration-300
        bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md
        hover:from-green-600 hover:to-emerald-700 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "✨ Generating..." : "⚡ Generate Insights"}
      </button>

      {insight && (
        <div
          className="mt-5 p-4 rounded-xl border 
          bg-gray-50 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 
          text-gray-800 dark:text-gray-100 whitespace-pre-line animate-fadeIn"
        >
          {insight}
        </div>
      )}
    </div>
  );
}

export default AiInsights;
