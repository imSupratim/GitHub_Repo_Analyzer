import React, { useState } from "react";
import AiInsights from "./components/AiInsights";
import LanguagesChart from "./components/LanguagesChart";
import CommitsChart from "./components/CommitsChart";
import ContributorsChart from "./components/ContributorsChart";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [repodata, setRepoData] = useState(null);
  const [languages, setLanguages] = useState({});
  const [contributors, setContributors] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const fetchRepoData = async () => {
    try {
      const repoRes = await fetch(
        `https://api.github.com/repos/${username}/${repo}`
      );
      const repoJson = await repoRes.json();

      const langRes = await fetch(
        `https://api.github.com/repos/${username}/${repo}/languages`
      );
      const langJson = await langRes.json();

      const contribRes = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contributors`
      );
      const contribJson = await contribRes.json();

      setRepoData(repoJson);
      setLanguages(langJson);
      setContributors(contribJson);
    } catch (error) {
      console.error("Error fetching repo data:", error);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-6 transition-colors duration-500 
      ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <header
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 
        w-[95%] md:w-[80%] flex items-center justify-between 
        rounded-2xl px-6 py-3 z-50 border transition-colors duration-500
        ${
          darkMode
            ? "backdrop-blur-lg bg-gray-800/40 border-gray-700 text-gray-100"
            : "backdrop-blur-lg bg-white/40 border-white text-gray-900"
        }`}
      >
        <h1 className="text-xl md:text-2xl font-extrabold">
          🚀 GitHub Analyzer
        </h1>

        {/* Toggle button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 
          text-white shadow-md hover:opacity-90 transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Push content below navbar */}
      <div className="mt-24 w-full flex flex-col items-center">
        {/* Input Section */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 w-full max-w-2xl">
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`px-4 text-lg font-bold py-3 border rounded-lg shadow-sm focus:ring-2 focus:outline-none w-full md:w-1/2 transition-colors duration-500
            ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />
          <input
            type="text"
            placeholder="📂 Repository"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className={`px-4 text-lg font-bold py-3 border rounded-lg shadow-sm focus:ring-2 focus:outline-none w-full md:w-1/2 transition-colors duration-500
            ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />
          <button
            onClick={fetchRepoData}
            className="px-5 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all duration-300 
            text-white font-semibold rounded-lg shadow-md w-full md:w-auto"
          >
            🔍 Fetch
          </button>
        </div>

        {/* Repo Data Card */}
        {repodata && (
          <div
            className={`shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-2xl animate-fadeIn transition-colors duration-500
            ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
          >
            <h2 className="text-2xl font-bold mb-2">{repodata.full_name}</h2>
            <p className="mb-4 italic">{repodata.description}</p>
            <ul className="text-base space-y-2">
              <li>
                ⭐ Stars:{" "}
                <span className="font-semibold">
                  {repodata.stargazers_count}
                </span>
              </li>
              <li>
                🍴 Forks:{" "}
                <span className="font-semibold">{repodata.forks_count}</span>
              </li>
              <li>
                🐞 Open Issues:{" "}
                <span className="font-semibold">
                  {repodata.open_issues_count}
                </span>
              </li>
              <li>
                👀 Watchers:{" "}
                <span className="font-semibold">
                  {repodata.subscribers_count}
                </span>
              </li>
              <li>
                💻 Languages:{" "}
                <span className="font-semibold">
                  {Object.keys(languages).join(", ")}
                </span>
              </li>
              <li>
                👥 Contributors:{" "}
                <span className="font-semibold">{contributors.length}</span>
              </li>
            </ul>

            <div className="mt-6 text-zinc-300">
              <AiInsights
                repodata={repodata}
                languages={languages}
                contributors={contributors}
              />
            </div>
          </div>
        )}

        {/* Charts Section */}
        {repodata && (
          <div className="mt-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Languages Chart */}
            <div
              className={`rounded-2xl shadow-lg p-6 transition-colors duration-500
              ${
                darkMode
                  ? "bg-gray-900/80 border border-gray-700"
                  : "bg-white/80 border border-gray-200"
              } backdrop-blur-md`}
            >
              <h3 className="text-lg  font-semibold mb-4 flex items-center gap-2">
                🌐 Languages Used
              </h3>
              <LanguagesChart languages={languages} />
            </div>

            {/* Commits Chart */}
            <div
              className={`rounded-2xl shadow-lg p-6 transition-colors duration-500
              ${
                darkMode
                  ? "bg-gray-900/80 border border-gray-700"
                  : "bg-white/80 border border-gray-200"
              } backdrop-blur-md`}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📊 Commit Activity
              </h3>
              <CommitsChart fullName={repodata.full_name} />
            </div>

            {/* Contributors Chart */}
            <div
              className={`rounded-2xl shadow-lg p-6 transition-colors duration-500 md:col-span-2
              ${
                darkMode
                  ? "bg-gray-900/80 border border-gray-700"
                  : "bg-white/80 border border-gray-200"
              } backdrop-blur-md`}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                👥 Contributors
              </h3>
              <ContributorsChart fullName={repodata.full_name} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
