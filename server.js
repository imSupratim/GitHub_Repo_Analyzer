import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

app.post("/api/generate", async (req, res) => {
  try {
    const { repodata, languages, contributors } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Give a short summary and insights about this GitHub repository:

      Name: ${repodata.full_name}
      Description: ${repodata.description}
      Stars: ${repodata.stargazers_count}
      Forks: ${repodata.forks_count}
      Open Issues: ${repodata.open_issues_count}
      Watchers: ${repodata.subscribers_count}
      Languages: ${JSON.stringify(languages)}
      Contributors: ${contributors.length}
    `;

    const result = await model.generateContent(prompt);

    // ✅ FIX: remove await here
    const responseText = result.response.text();

    res.json({ insight: responseText });
  } catch (error) {
    console.error("Error generating insights:", error);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));