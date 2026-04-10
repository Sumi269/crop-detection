const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    
    // In production, grab API key from .env file
    // Check if API KEY exists, if not provide a fallback
    if (!process.env.GEMINI_API_KEY) {
        // Fallback mock mode
        return res.json({ 
            reply: `(MOCK GEMINI) I received your query: "${message}". Please configure process.env.GEMINI_API_KEY for real AI.` 
        });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a highly advanced Agricultural AI Chatbot. 
    Your goal is to help a farmer with crop disease prevention, farming techniques, and weather advice.
    Farmer asks: ${message}
    Keep the response concise, incredibly helpful, formatted nicely in markdown or plain text, and focus solely on agriculture.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
});

module.exports = router;
