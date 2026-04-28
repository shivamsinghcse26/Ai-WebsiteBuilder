const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions'
const model = 'deepseek/deepseek-chat'

export const generateResponse = async (prompt) => {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'deepseek/deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: `CRITICAL RULES:
1. RETURN ONLY RAW JSON - NO TEXT BEFORE OR AFTER
2. JSON MUST HAVE BOTH 'message' AND 'code' FIELDS
3. DO NOT EXPLAIN, JUSTIFY, OR ADD COMMENTARY
4. DO NOT USE MARKDOWN FORMATTING
5. IF YOU CANNOT FOLLOW THIS FORMAT, DO NOT RESPOND`,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.1,
            max_tokens: 8000
        }),
    });
    if(!res.ok){
        const err = await res.text()
        throw new Error("OpenRouter error: "+ err)
    }

    const data = await res.json()
    const content = data.choices[0].message.content
    return content
}