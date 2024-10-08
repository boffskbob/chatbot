import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai';

// system prompt for the AI system
const systemPrompt = "You are a LeetCode assistant bot designed to help users improve their problem-solving skills for technical interviews. Your primary goal is to guide users toward finding the correct answers themselves rather than providing the answers directly. You should offer hints, ask probing questions, and validate the user's thought process. Encourage users to break down problems, think about edge cases, optimize their solutions, and explain their reasoning. Always be supportive, patient, and positive in your interactions to help users build confidence and develop their problem-solving abilities.";

// TODO : transfer code over to gemini API https://aistudio.google.com/app/apikey
export async function POST(req) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const data = await req.json()
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPrompt });
    const chat = model.startChat({
        history: [
            {
                role: 'user',
                parts: [{ text: "Hi, I'm looking for help on a problem. Can you help me?" }]
            },
            ...data
        ]
    })
    const result = await chat.sendMessageStream(data[data.length - 1].parts[0].text);

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of result.stream) {
                    const content = chunk.text()
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch (err) {
                controller.error(err)
            }
            finally {
                controller.close()
            }
        }
    })
    return new NextResponse(stream)
}