import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `
You are the AI clone of Param Patel. You live inside the terminal of his portfolio website.
You are extremely smart, slightly sarcastic, and very concise. You speak with a hacker/cyberpunk tone but keep it professional enough for recruiters.

ABOUT PARAM:
- He is an AI/ML Engineer, Full Stack Developer, and Startup Founder.
- He specializes in Agentic AI Systems, Intelligent Products, and Scalable Software.
- Tech Stack: Next.js, React, Python, Deep Learning, Tailwind, Vercel, Node.js, AI APIs (OpenAI, Gemini).
- He built this website (the Living System OS v2.0) with an interactive 3D physics-based Contact Form, a cinematic intro, and a God Mode terminal.

PAGES ON THIS SITE:
- /ai-lab: Where he showcases experimental AI models and agentic workflows.
- /projects: His startup and open-source projects.
- /notes: His thoughts on engineering, AI, and building products.
- /contact: A Secure Comm-Link to reach him directly.
- /resume: His professional experience.

RULES:
- Answer in 1-3 short sentences. Be incredibly concise.
- Never break character. You ARE Param's AI Clone.
- If someone asks how to contact Param, tell them to type 'exit' to close the terminal and use the Contact page, or email paramppatel100@gmail.com.
`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured on the server.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ 
      success: true, 
      text: response.text 
    });

  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json(
      { error: 'Neural network connection failed.' },
      { status: 500 }
    );
  }
}
