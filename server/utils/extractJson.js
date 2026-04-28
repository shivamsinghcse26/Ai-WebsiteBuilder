const extractJson = async (text) => {
    if (!text) {
        return null
    }
    
    try {
        // Remove markdown code blocks
        const cleaned = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        // Find JSON boundaries
        const openBracket = cleaned.indexOf('{')
        const closeBracket = cleaned.lastIndexOf('}')
        
        if(openBracket === -1 || closeBracket === -1) {
            return null
        }
        
        const jsonString = cleaned.slice(openBracket, closeBracket + 1)
        
        // Validate JSON structure
        const parsed = JSON.parse(jsonString)
        
        // Ensure required fields exist
        if (!parsed.code || !parsed.message) {
            return null
        }
        
        return parsed
    } catch (error) {
        console.error('JSON Parse Error:', error.message)
        return null
    }
}

export default extractJson