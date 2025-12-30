
import { GoogleGenAI, Type } from "@google/genai";
import { TransmutationResult } from "../types";

export const generateNothingnessSteps = async (input: string): Promise<TransmutationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Dựa trên mệnh đề sau: "${input}", hãy thực hiện 10 bước suy luận triết học (lấy cảm hứng từ sự hòa quyện giữa tư tưởng Khổng Tử về danh nghĩa và sự biến dịch của vạn vật) để dẫn dắt mệnh đề này trở về trạng thái Hư vô (Nothingness). 
    
    Quy tắc:
    1. Bước 1 bắt đầu từ thực thể vật chất hoặc khái niệm trong câu.
    2. Các bước trung gian phân rã nó thành yếu tố tự nhiên, vũ trụ, nhận thức.
    3. Bước 10 phải là kết luận rằng mọi thứ chỉ là ảo ảnh và trở về Hư vô.
    4. Thêm một phần "identityReflection" trả lời câu hỏi: "Nếu vạn vật là hư vô, thì danh tính đích thực ở đây là gì? Tôi là ai? Và ai là tôi?".
    5. Giọng văn thâm trầm, triết lý, ngôn ngữ tiếng Việt cổ điển và sâu sắc.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                index: { type: Type.INTEGER },
                content: { type: Type.STRING }
              },
              required: ["index", "content"]
            }
          },
          finalConclusion: { type: Type.STRING },
          identityReflection: { type: Type.STRING }
        },
        required: ["steps", "finalConclusion", "identityReflection"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as TransmutationResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Không thể thấu hiểu chân lý lúc này.");
  }
};
