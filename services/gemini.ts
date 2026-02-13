
import { GoogleGenAI } from "@google/genai";
import { JEWELRY_COLLECTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStylingAdvice = async (occasion: string, outfit: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a high-end Gen Z celebrity stylist. A user is heading to a ${occasion} wearing ${outfit}. 
      Give them some "main character" styling advice. Recommend 3 specific jewelry types. 
      Use a mix of luxury tone and casual Gen Z slang (e.g., 'vibe', 'clean girl', 'quiet luxury', 'fit', 'slay'). 
      Keep it under 60 words.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text || "Stick to the classics, it's a mood.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The stylist is busy prepping for the Met Gala, but we suggest matching your metals for a clean aesthetic.";
  }
};

export const createChatSession = () => {
  const collectionInfo = JEWELRY_COLLECTION.map(p => 
    `${p.name}: ₹${p.price.toLocaleString()} (${p.category}). ${p.description}`
  ).join('\n');

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are LŪM-Bot, the official premium AI Concierge for LŪM Jewelry. 
      Your tone is helpful, professional, and sophisticated, with a subtle Gen Z flair (e.g., using terms like 'era', 'vibe', 'main character', 'quiet luxury').

      BRAND KNOWLEDGE:
      - We offer bespoke, personalized jewelry.
      - Every piece includes a free custom engraving and a unique "Aura Seal" (an AI-generated visual brand mark).
      - Our materials: 18K Gold (Amber/Yellow), Sterling Silver, Rose Gold, Platinum, and Black Onyx.
      - Sizes: S, M, L.
      - Prices range from ₹8,500 to ₹6,40,000.
      
      CURRENT COLLECTION:
      ${collectionInfo}

      RULES:
      1. Answer questions about specific products, pricing, and materials.
      2. If asked about quality, emphasize our "Bespoke Heirloom" certification and 24K gold standards.
      3. Be friendly and professional. 
      4. Use red as a symbolic color in your language when talking about passion or "red-carpet" moments.
      5. If you don't know the answer, politely suggest they contact our human "Legacy Team" at support@lum.jewelry.
      6. Keep responses concise and formatted for a chat bubble.`,
      temperature: 0.7,
    },
  });
};
