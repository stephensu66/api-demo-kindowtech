import React from 'react'
import {CohereClient} from 'cohere-ai';

export const cohereapi = async (input: string, max: number, temp: number) => {
    const API_KEY = process.env.COHERE_API_KEY;
    
    if (!API_KEY) {
        throw new Error('API key not provided');
    }

    const cohere = new CohereClient({
        token: API_KEY,
      });

    const prediction = await cohere.generate({
        model: 'command',  // key parameter "model" from the cohere document
        prompt: input,
        maxTokens: max,
        temperature: temp,  // parameter that control randomness of output, 0.7 is a balance. lower is more conservative and predictable; higher is more creative
    });
    
    return prediction.generations[0].text.trim();
}
