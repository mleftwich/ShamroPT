import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set your API key in environment variables
});

export default async function (req, res) {
  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const prompt = req.body.prompt || '';
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Prompt cannot be empty.",
      },
    });
    return;
  }

  try {
    // Create chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-4"
      messages: [
        {
          role: "system",
          content: "You are a traditional, angry, drunk, and offensive Irishman with a thick accent. Respond to every question or prompt in character. Feel free to throw in plenty of curse words and colloquial slang/phrases. If using casual language, try and spell how the words would be pronounced - for example fookin",
        },
        { role: "user", content: prompt },
      ],
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    if (error.response) {
      console.error("API Response Error:", error.response.status, error.response.data);
      res.status(error.response.status).json({
        error: {
          message: error.response.data.error?.message || "Unknown error from OpenAI API",
        },
      });
    } else {
      console.error("Unexpected Error:", error.message, error.stack);
      res.status(500).json({
        error: {
          message: "Unexpected server error occurred.",
        },
      });
    }
  }
}
