import { GoogleGenerativeAI } from "@google/generative-ai";
import Transaction from "../models/transactionModel.js";

// Initialize Gemini API
const initGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  return new GoogleGenerativeAI(apiKey);
};

export const processChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Initialize Gemini
    const genAI = initGemini();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Fetch user's recent transactions (last 30 days) to provide context.
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentTransactions = await Transaction.find({
      userId: userId,
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: -1 });

    // Calculate sum of income and expenses for the context
    let totalIncome = 0;
    let totalExpense = 0;

    // Format transactions for the AI prompt
    const transactionList = recentTransactions.map(t => {
      if (t.type === 'income') totalIncome += t.amount;
      if (t.type === 'expense') totalExpense += t.amount;
      return `- ${new Date(t.date).toLocaleDateString()}: ${t.type.toUpperCase()} of $${t.amount} in category "${t.category}". ${t.notes ? 'Notes: ' + t.notes : ''}`;
    }).join('\n');

    const systemPrompt = `
      You are an AI Personal Finance Assistant for the "FinSmart" app.
      Your goal is to help the user understand their finances, provide budgeting advice, and answer questions about their spending.
      You should be helpful, concise, and professional.

      Here is the user's financial context for the last 30 days:
      Total Income: $${totalIncome}
      Total Expense: $${totalExpense}
      Net Savings: $${totalIncome - totalExpense}

      Recent Transactions:
      ${transactionList ? transactionList : "No recent transactions found."}

      User's Question: "${message}"

      Please provide a helpful, concise response based ONLY on the provided financial context and general financial wisdom. Do not make up fake transactions. If the user asks something unrelated to finance, politely steer the conversation back to their personal finances. Format the output in Markdown for readability.
    `;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error("Error in processChat:", error);

    // Handle specific Gemini API errors if possible
    if (error.message && error.message.includes('API_KEY')) {
      return res.status(500).json({ error: "Configuration error: Invalid or missing AI API Key." });
    }

    res.status(500).json({ error: "I'm having trouble fetching your data. Please try again in a moment." });
  }
};
