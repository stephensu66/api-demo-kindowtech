import { NextApiRequest, NextApiResponse } from 'next';
import { cohereapi } from '@/function/cohereapi';
import * as yup from "yup";
import { geminiApi } from "../../function/geminiApi";

// Define the validation schema
const requestSchema = yup.object().shape({
  brand: yup.string().required('Brand is required'),
  contentObjective: yup.string().required('Content objective is required'),
  targetAudience: yup.string().required('Target audience is required'),
  industry: yup.string().required('Industry is required'),
  painPoints: yup.string().required('Pain points are required'),
  goals: yup.string().required('Goals are required')
});

const modelReq = async (req: NextApiRequest, res: NextApiResponse) => {
  
    if(req.method === "POST"){
      
      //log the incoming request body
      console.log("incoming request body:", req.body);
      // Validate request body
      await requestSchema.validate(req.body, { abortEarly: false });

      const { brand, contentObjective, targetAudience, industry, painPoints, goals } = req.body;
      
      console.log('Input Parameters:', {
        brand,
        contentObjective,
        targetAudience,
        industry,
        painPoints,
        goals
      });

      const bioPrompt = `Create a bio for people who works in ${industry} for ${brand}.`;
      const painPointsPrompt = `Summarize the pain points of ${targetAudience} related to ${industry}: ${painPoints}.`;
      const goalsPrompt = `Summarize the goals of ${targetAudience} related to ${contentObjective}: ${goals}.`;
      
      const startTime = Date.now();

    try {
          //cohere api
          //const bioRes = await cohereapi(bioPrompt, 50, 0.2);
          const painPointsRes = await geminiApi(painPointsPrompt, 100, 0.7);
          const goalsRes = await geminiApi(goalsPrompt, 100, 0.7);
          
          //gemini api
          const bioRes = await geminiApi(bioPrompt, 100, 0.7);
          
          const endTime = Date.now();
          console.log("execution time:", `${endTime-startTime} ms`)
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