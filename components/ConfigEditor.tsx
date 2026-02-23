
import React from 'react';
import { AppConfig, OCRModel } from '../types';
import { Save, RefreshCcw, Info, Settings2 } from 'lucide-react';

const ConfigEditor: React.FC<{ config: AppConfig; setConfig: (c: AppConfig) => void }> = ({ config, setConfig }) => {
  const handleChange = (section: string, field: string, value: any) => {
    setConfig({
      ...config,
      [section]: {
        ...(config as any)[section],
        [field]: value
      }
    });
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* OCR Engine Config */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Settings2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">OCR Engine</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Default Model</label>
              <select 
                value={config.ocr.default_model}
                onChange={(e) => handleChange('ocr', 'default_model', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value={OCRModel.PADDLE}>PaddleOCR (Open Source)</option>
                <option value={OCRModel.EASYOCR}>EasyOCR (Fast)</option>
                <option value={OCRModel.GEMINI}>Gemini Pro (Commercial)</option>
                <option value={OCRModel.OPENAI}>GPT-4o OCR (Commercial)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-700">Fallback Enabled</p>
                <p className="text-[11px] text-slate-500">Switch engine if confidence is low</p>
              </div>
              <input 
                type="checkbox" 
                checked={config.ocr.fallback_enabled}
                onChange={(e) => handleChange('ocr', 'fallback_enabled', e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Accuracy Threshold</label>
                <span className="text-xs font-bold text-blue-600">{(config.ocr.accuracy_threshold * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" min="0.5" max="0.99" step="0.01"
                value={config.ocr.accuracy_threshold}
                onChange={(e) => handleChange('ocr', 'accuracy_threshold', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </section>

        {/* Processing & Preprocessing */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <RefreshCcw size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Processing</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
              <div>
                <p className="text-sm font-bold text-slate-700">Watermark Removal</p>
                <p className="text-[11px] text-slate-500">OpenCV auto-inpainting</p>
              </div>
              <input 
                type="checkbox" 
                checked={config.processing.watermark_detection_confidence > 0}
                className="w-5 h-5 accent-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-700">Adversarial Mode</p>
                <p className="text-[11px] text-slate-500">Stress test edge cases</p>
              </div>
              <input 
                type="checkbox" 
                checked={config.logging.adversarial_mode}
                onChange={(e) => handleChange('logging', 'adversarial_mode', e.target.checked)}
                className="w-5 h-5 accent-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Translation</label>
              <select 
                value={config.processing.target_language}
                onChange={(e) => handleChange('processing', 'target_language', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Chinese">Chinese (Simplified)</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex gap-4">
        <div className="text-amber-500 mt-1">
          <Info size={24} />
        </div>
        <div>
          <h4 className="text-amber-900 font-bold text-sm">Cost Management Alert</h4>
          <p className="text-amber-700 text-xs leading-relaxed mt-1">
            System is configured to auto-switch to PaddleOCR after {config.cost_management.auto_switch_threshold} commercial API calls. 
            This ensures high uptime while minimizing operational expenses.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">
          Discard Changes
        </button>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 flex items-center gap-2">
          <Save size={20} />
          Save Configurations
        </button>
      </div>
    </div>
  );
};

export default ConfigEditor;
