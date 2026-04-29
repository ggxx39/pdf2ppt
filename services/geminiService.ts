
import { GoogleGenAI, Type } from "@google/genai";
import { AppConfig } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeLayoutAndOCR(base64Data: string, mimeType: string, config: AppConfig): Promise<any> {
    let prompt = `
      Perform high-fidelity OCR and layout analysis on this document.
      Identify:
      1. All text blocks with their relative coordinates (x, y, width, height) on a 0-1000 scale.
      2. Headers and Footers.
      3. Images or diagrams.
      4. Tables (extract structure).
      5. Detect any watermarks or brand markings.
    `;

    if (config.logging.chain_of_thought) {
      prompt += `\n6. Provide a detailed step-by-step reasoning process (Chain of Thought) explaining how you identified the layout, handled ambiguous characters, and detected watermarks.`;
    }

    if (config.logging.adversarial_mode) {
      prompt += `\n7. ADVERSARIAL MODE: Perform deep forensic analysis. Look for hidden text, micro-printing, corrupted layouts, OCR-resistant artifacts, or signs of document tampering. Report your findings in a 'forensic_analysis' field.`;
    }

    if (config.processing.enable_translation) {
      prompt += `\n8. Translate all extracted text blocks into ${config.processing.target_language}. The 'text' field should contain the translated text.`;
    }

    prompt += `\nReturn the response as a valid JSON object.`;

    const schemaProperties: any = {
      pages: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            page_number: { type: Type.NUMBER },
            text_blocks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  bbox: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                  type: { type: Type.STRING }
                },
                required: ["text", "bbox", "type"]
              }
            },
            tables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  rows: {
                    type: Type.ARRAY,
                    items: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            },
            images: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  bbox: { type: Type.ARRAY, items: { type: Type.NUMBER } }
                }
              }
            }
          },
          required: ["page_number", "text_blocks"]
        }
      },
      watermark_detected: { type: Type.BOOLEAN },
      watermark_confidence: { type: Type.NUMBER },
      accuracy_estimate: { type: Type.NUMBER }
    };

    if (config.logging.chain_of_thought) {
      schemaProperties.reasoning_steps = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            step: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            action: { type: Type.STRING }
          },
          required: ["step", "reasoning", "confidence", "action"]
        }
      };
    }

    if (config.logging.adversarial_mode) {
      schemaProperties.forensic_analysis = {
        type: Type.OBJECT,
        properties: {
          tampering_detected: { type: Type.BOOLEAN },
          hidden_artifacts: { type: Type.ARRAY, items: { type: Type.STRING } },
          analysis_notes: { type: Type.STRING }
        },
        required: ["tampering_detected", "analysis_notes"]
      };
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: prompt },
            { inlineData: { data: base64Data, mimeType: mimeType } }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: schemaProperties,
            required: ["pages", "watermark_detected", "accuracy_estimate"]
          }
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini OCR Error:", error);
      throw new Error("OCR processing failed. Please check your document and try again.");
    }
  }

  async translateText(text: string, targetLang: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLang}: \n\n${text}`
    });
    return response.text || text;
  }
}

export const geminiService = new GeminiService();
