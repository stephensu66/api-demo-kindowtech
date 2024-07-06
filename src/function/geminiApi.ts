import React from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiApi = async (input: string, maxTokens: number, temp: number) => {
  const API_KEY: string = process.env.GEMINI_API_KEY;
  
  // Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

//Options to control content generation
const generationConfig = {
    // stopSequences: ["red"],
    maxOutputTokens: maxTokens,
    temperature: temp, //
    topP: 0.1,  //controls the diversity of the generated output by limiting the cumulative probability distribution of next-word candidates
    topK: 16, // top 16 candidates with the highest probability for generating the next token.
  };

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig});
  

// Example: Use the generative model to generate text
const result = await model.generateContent(input);
const response = result.response;

// Return the generated response
return response.text();

}
