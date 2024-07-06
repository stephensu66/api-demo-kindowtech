import { NextApiRequest, NextApiResponse } from 'next';
import { cohereapi } from '@/function/cohereapi';
import { geminiApi } from "../../function/geminiApi";

const modelReq = async (req: NextApiRequest, res: NextApiResponse) => {
  
    if(req.method === "POST"){
      const { brand, contentObjective, targetAudience, industry, painPoints, goals } = req.body;

      const bioPrompt = `Create a bio for people who works in ${industry} for ${brand}.`;
      const painPointsPrompt = `Summarize the pain points of ${targetAudience} related to ${industry}: ${painPoints}.`;
      const goalsPrompt = `Summarize the goals of ${targetAudience} related to ${contentObjective}: ${goals}.`;
  

    try {
          //cohere api
          //const bioRes = await cohereapi(bioPrompt, 50, 0.2);
          const painPointsRes = await cohereapi(painPointsPrompt, 100, 0.7);
          const goalsRes = await cohereapi(goalsPrompt, 100, 0.7);
          
          //gemini api
          const bioRes = await geminiApi(bioPrompt, 100, 0.7);
          
        console.log(bioRes);
          res.status(200).json({ 
            bioRes: bioRes,
            painPointsRes: painPointsRes,
            goalsRes: goalsRes
           });
    } catch (err: any) {
        console.error('Error:', err);
        res.status(500).json({ err: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  
    
}

export default modelReq;