import { GoogleGenAI, Type } from "@google/genai";
import { AlchemyResult } from '../types';

export const generateRecipesFromIngredients = async (ingredients: string[]): Promise<AlchemyResult> => {
  // 安全获取 API Key，防止在没有 process 环境下崩溃
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
  
  if (!apiKey) {
    // 模拟一个友好的错误，而不是崩溃
    console.warn("未检测到 API 密钥，请确保在支持的环境中运行或配置 .env");
    throw new Error("魔法能量不足（未配置 API Key）");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Define the schema for the output
  const recipeSchema = {
    type: Type.OBJECT,
    properties: {
      message: {
        type: Type.STRING,
        description: "一段简短、神奇的欢迎语，确认已检测到的食材（例如：'检测到3种食材，正在为您生成完美食谱...'）。",
      },
      recipes: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "菜谱名称" },
            difficulty: { type: Type.STRING, description: "使用星星符号，如 ⭐ 或 ⭐⭐" },
            time: { type: Type.STRING, description: "预计烹饪时间，如 '15分钟'" },
            tagline: { type: Type.STRING, description: "一句简短、朗朗上口的标语，描述这道菜的氛围" },
            description: { type: Type.STRING, description: "一段简短、诱人的菜品描述。" }
          },
          required: ["title", "difficulty", "time", "tagline", "description"]
        }
      }
    },
    required: ["message", "recipes"]
  };

  const prompt = `
    你是一位“冰箱炼金术士”。我的冰箱里有以下食材：${ingredients.join(', ')}。
    请利用这些食材（以及家中常备的油、盐、酱、醋等基础调料）创造 3 道独特的、美味的食谱。
    
    要求：
    1. 语言必须是简体中文。
    2. 语气要温暖、诱人，带有一点魔法感。
    3. 食谱要切合实际，利用现有食材。
    
    请以 JSON 格式回复。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        systemInstruction: "你是一位乐于助人且富有创造力的烹饪魔法师。",
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini 未返回数据");
    }

    return JSON.parse(text) as AlchemyResult;

  } catch (error) {
    console.error("Alchemy failed:", error);
    throw error;
  }
};