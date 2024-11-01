import axios from "axios";
import dotenv from 'dotenv'; 

dotenv.config(); 

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 
console.log(OPENAI_API_KEY);

async function callOpenAIModel(prompt: string) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    console.log('Response from OpenAI:', response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

// Example usage
callOpenAIModel('What is the capital of France?');
