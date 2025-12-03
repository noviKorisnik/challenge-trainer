const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

module.exports = async function (context, req) {
    context.log('Gemini API proxy called');

    if (!GEMINI_API_KEY) {
        context.res = {
            status: 500,
            body: { error: 'API key not configured' }
        };
        return;
    }

    const { action, prompt, model = 'gemini-2.5-flash' } = req.body;

    if (!action || !prompt) {
        context.res = {
            status: 400,
            body: { error: 'Missing required fields: action, prompt' }
        };
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const generativeModel = genAI.getGenerativeModel({
            model,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        });

        const result = await generativeModel.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: { text }
        };

    } catch (error) {
        context.log.error('Gemini API error:', error);
        context.res = {
            status: 500,
            body: {
                error: 'Failed to generate content',
                message: error.message
            }
        };
    }
};
