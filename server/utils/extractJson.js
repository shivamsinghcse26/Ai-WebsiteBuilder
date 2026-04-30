const extractJson = async (text) => {
    if (!text) {
        console.warn('extractJson: Empty text provided')
        return null
    }
    
    try {
        // Remove markdown code blocks
        let cleaned = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        // Remove any leading/trailing text before and after JSON
        const openBracket = cleaned.indexOf('{')
        const closeBracket = cleaned.lastIndexOf('}')
        
        if(openBracket === -1 || closeBracket === -1) {
            console.warn('extractJson: No JSON brackets found in response:', text.substring(0, 200))
            return null
        }
        
        const jsonString = cleaned.slice(openBracket, closeBracket + 1)
        
        // Validate JSON structure
        const parsed = JSON.parse(jsonString)
        
        // Ensure required fields exist
        if (!parsed.code || typeof parsed.code !== 'string' || parsed.code.trim().length === 0) {
            console.warn('extractJson: Missing or empty code field')
            return null
        }

        if (!parsed.message || typeof parsed.message !== 'string') {
            parsed.message = 'Website generated successfully'
        }
        
        return parsed
    } catch (error) {
        console.error('extractJson: JSON Parse Error -', error.message)
        console.error('extractJson: Raw text:', text.substring(0, 500))
        return null
    }
}

export default extractJson