interface LLM {
  call(prompt: string): Promise<string>;
}

let llm: LLM;

function getMockResponse(prompt: string): string {
  const companyMatch = prompt.match(/Company:\s*(.+?)\n/);
  const company = companyMatch ? companyMatch[1] : 'the company';

  return `Invest
Reasoning: Based on the analysis of **${company}**, here is our AI-generated investment assessment:

## Market Position
${company} demonstrates strong market positioning with consistent revenue growth and a solid competitive moat. The company's brand recognition and customer loyalty provide significant advantages in their sector.

## Financial Health
- **Revenue Trend:** Steady upward trajectory over the past 4 quarters
- **Profit Margins:** Above industry average, indicating operational efficiency  
- **Debt Ratio:** Manageable levels with strong cash flow generation

## News Sentiment
Recent news coverage has been predominantly positive, with analysts highlighting:
- Strategic investments in emerging technologies
- Expansion into new markets
- Strong leadership and governance

## Risk Assessment
While market volatility remains a factor, the company's diversified portfolio and strong balance sheet provide resilience against economic downturns.

> **Note:** This is a fallback mock analysis. Connect a valid API key to enable live generation.`;
}

const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (geminiApiKey) {
  llm = {
    async call(prompt: string): Promise<string> {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.2
            }
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Gemini API error: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error(`Invalid Gemini response format: ${JSON.stringify(data)}`);
        }
        return text;
      } catch (err) {
        console.error("Gemini API call failed, falling back to mock response.", err);
        return getMockResponse(prompt);
      }
    }
  };
} else if (process.env.OPENAI_API_KEY) {
  try {
    const { ChatOpenAI } = require('@langchain/openai');
    const chatModel = new ChatOpenAI({
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
    });
    llm = {
      async call(prompt: string): Promise<string> {
        const response = await chatModel.invoke(prompt);
        return typeof response.content === 'string'
          ? response.content
          : JSON.stringify(response.content);
      },
    };
  } catch {
    try {
      const { OpenAI } = require('langchain/llms/openai');
      llm = new OpenAI({ temperature: 0.2, openAIApiKey: process.env.OPENAI_API_KEY }) as LLM;
    } catch {
      llm = {
        async call(prompt: string) {
          return getMockResponse(prompt);
        },
      };
    }
  }
} else {
  llm = {
    async call(prompt: string) {
      return getMockResponse(prompt);
    },
  };
}

export default llm;
