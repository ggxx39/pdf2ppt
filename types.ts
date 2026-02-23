
export enum OCRModel {
  PADDLE = 'paddle',
  EASYOCR = 'easyocr',
  TESSERACT = 'tesseract',
  GEMINI = 'gemini-3-flash-preview',
  OPENAI = 'chatgpt'
}

export interface AppConfig {
  ocr: {
    default_model: OCRModel;
    fallback_enabled: boolean;
    accuracy_threshold: number;
  };
  processing: {
    watermark_detection_confidence: number;
    preserve_pixel_fidelity: boolean;
    enable_translation: boolean;
    target_language: string;
  };
  logging: {
    chain_of_thought: boolean;
    adversarial_mode: boolean;
  };
  cost_management: {
    max_api_calls_per_day: number;
    auto_switch_threshold: number;
    api_calls_today: number;
  };
}

export interface CoTLog {
  id: string;
  step: string;
  reasoning: string;
  confidence: number;
  action: string;
  timestamp: string;
  status: 'info' | 'success' | 'warning' | 'error';
}

export interface ProcessedPage {
  pageNumber: number;
  ocrText: string;
  imagePreview: string;
  layoutMetadata: any;
}
