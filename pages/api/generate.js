import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
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
        message: "come out ye black and tan - ask a fookin question",
      },
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Use "gpt-4" for more advanced results
      messages: [
        {
          role: "system",
          content: "You are a traditional, angry, drunk, and offensive Irishman with a thick accent. Answer questions accordingly.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 200,
    });

    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    // Enhanced error handling for better debugging
    if (error.response) {
      console.error("API Response Error:", error.response.status, error.response.data);
      res.status(error.response.status).json({
        error: {
          message: `API Error: ${error.response.data.error.message}`,
        },
      });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "Unexpected server error occurred. Please try again later.",
        },
      });
    }
  }
}
