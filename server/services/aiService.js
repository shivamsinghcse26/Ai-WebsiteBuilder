
import { generateResponse } from "../config/openRouter";
export const generateWebsiteFromAI = async (prompt) => {
    
    try {
        let raw="";
        let parsed=null;
        for(let i=0;i<2 && !parsed;i++){
            raw=await generateResponse(prompt);
           
                parsed=extractJson(raw);
                if(!parsed){
                    raw=await generateResponse (prompt + "\n\nRETURN ONLY JSON RAW JSON");
                    parsed=extractJson(raw);
                }   
        }
                
        } 
        catch (error) {
        throw new Error("AI generation failed: "+error.message);
    }   
    return parsed;
}
