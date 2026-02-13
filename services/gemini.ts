
import { GoogleGenAI } from "@google/genai";

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
