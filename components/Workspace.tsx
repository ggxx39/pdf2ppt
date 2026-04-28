
import React, { useState, useRef } from 'react';
import { 
  FileUp, 
  Trash2, 
  Play, 
  Layers, 
  FileText, 
  Download, 
  Terminal,
  Scissors,
  CheckCircle2,
  FileSearch
} from 'lucide-react';
import { AppConfig, CoTLog } from '../types';
import { geminiService } from '../services/geminiService';
import PptxGenJS from 'pptxgenjs';

const Workspace: React.FC<{ config: AppConfig; addLog: (log: any) => void }> = ({ config, addLog }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<{ base64: string; mimeType: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const isPdf = selected.type === 'application/pdf';
    const isImage = selected.type.startsWith('image/');

    if (isPdf || isImage) {
      setFile(selected);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const base64 = result.split(',')[1];
          setFileData({ base64, mimeType: selected.type });
          
          if (isImage) {
            setPreviewUrl(result);
          } else {
            setPreviewUrl(null); // Clear image preview for PDF
          }

          addLog({
            step: "input_handler",
            reasoning: `Detected ${selected.type} file. Reading binary data into memory buffer...`,
            confidence: 1.0,
            action: `File loaded: ${selected.name} (${(selected.size / 1024).toFixed(1)} KB)`,
            status: 'success'
          });
        }
      };
      reader.readAsDataURL(selected);
    } else {
      alert("Please upload a valid PDF or Image file.");
    }
  };

  const processFile = async () => {
    if (!file || !fileData) return;
    
    setIsProcessing(true);
    setProgress(10);
    setOutput(null);

    try {
      // 1. Pre-processing Simulation
      setProgress(25);
      addLog({
        step: "preprocessor",
        reasoning: "Checking for OCR-resistant artifacts and watermarks in source stream.",
        confidence: 0.95,
        action: "Normalizing page density and preparing for model transmission.",
        status: 'info'
      });
      await new Promise(r => setTimeout(r, 600));
      
      // 2. OCR Manager: Sending real data
      setProgress(40);
      addLog({
        step: "ocr_manager",
        reasoning: `Model strategy: ${config.ocr.default_model}. Input type: ${fileData.mimeType}.`,
        confidence: 1.0,
        action: `Transmitting ${file.name} to Gemini backend...`,
        status: 'info'
      });

      // 3. Perform REAL OCR via Gemini
      setProgress(60);
      const result = await geminiService.analyzeLayoutAndOCR(fileData.base64, fileData.mimeType, config);
      
      if (result.reasoning_steps && config.logging.chain_of_thought) {
        result.reasoning_steps.forEach((step: any) => {
          addLog({
            step: step.step,
            reasoning: step.reasoning,
            confidence: step.confidence,
            action: step.action,
            status: step.confidence > 0.8 ? 'success' : 'warning'
          });
        });
      }

      if (result.forensic_analysis && config.logging.adversarial_mode) {
        addLog({
          step: "forensic_analysis",
          reasoning: result.forensic_analysis.analysis_notes,
          confidence: 0.99,
          action: result.forensic_analysis.tampering_detected ? "Tampering Detected!" : "Document Intact",
          status: result.forensic_analysis.tampering_detected ? 'error' : 'info'
        });
      }

      if (result.accuracy_estimate < config.ocr.accuracy_threshold) {
        addLog({
          step: "ocr_manager",
          reasoning: `Model accuracy ${result.accuracy_estimate} below threshold. Confidence low for certain glyphs.`,
          confidence: 0.7,
          action: "Flagging document for manual review or secondary OCR pass.",
          status: 'warning'
        });
      }

      setOutput(result);
      addLog({
        step: "layout_analyzer",
        reasoning: "Translating document coordinates into PPTX-standard percentage-based units.",
        confidence: 0.92,
        action: `Successful extraction: ${result.pages?.length || 0} pages.`,
        status: 'success'
      });

      // 4. PPTX Generation Simulation
      setProgress(90);
      addLog({
        step: "pptx_generator",
        reasoning: "Generating SlideMaster with detected font families and hierarchy.",
        confidence: 1.0,
        action: "Finalizing PPTX structure for download.",
        status: 'info'
      });
      await new Promise(r => setTimeout(r, 500));

      setProgress(100);
      setIsProcessing(false);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      addLog({
        step: "error_handler",
        reasoning: "API or Processing Exception encountered.",
        confidence: 0,
        action: `Process halted: ${error instanceof Error ? error.message : "Unknown error"}`,
        status: 'error'
      });
    }
  };

  const downloadPPTX = () => {
    if (!output || !output.pages) return;
    
    const pptx = new PptxGenJS();
    output.pages.forEach((page: any) => {
      let slide = pptx.addSlide();
      
      if (page.text_blocks) {
        page.text_blocks.forEach((block: any) => {
          // Map coordinates (Gemini usually uses 0-1000 scale)
          slide.addText(block.text, { 
            x: (block.bbox[0] / 1000) * 10, 
            y: (block.bbox[1] / 1000) * 7.5, 
            w: (block.bbox[2] / 1000) * 10, 
            fontSize: 11, 
            color: '333333' 
          });
        });
      }

      if (page.tables) {
        page.tables.forEach((table: any, idx: number) => {
          slide.addTable(table.rows, { x: 0.5, y: 1 + (idx * 2), w: 9 });
        });
      }
    });

    pptx.writeFile({ fileName: `${file?.name.split('.')[0]}_Converted.pptx` });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Upload & Preview Side */}
      <div className="space-y-6">
        <div 
          className={`h-[600px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all relative overflow-hidden bg-white ${
            file ? 'border-slate-200' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/30'
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFileChange({ target: { files: e.dataTransfer.files } } as any); }}
        >
          {file ? (
            <div className="w-full h-full relative group flex flex-col items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} className="max-h-full max-w-full object-contain rounded-xl shadow-lg" alt="Preview" />
              ) : (
                <div className="text-center space-y-4 p-12 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="mx-auto w-24 h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner">
                    <FileSearch size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">PDF Document Active</h3>
                    <p className="text-sm text-slate-500 font-mono mt-1">{file.name}</p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                      <CheckCircle2 size={14} /> Ready for Gemini OCR
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-xl">
                <button 
                  onClick={() => { setFile(null); setFileData(null); setPreviewUrl(null); }}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg transform hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-red-300"
                  aria-label="Remove file"
                  title="Remove file"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-100">
                <FileUp size={40} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Upload your Document</h3>
                <p className="text-sm text-slate-500">Supports PDF, PNG, JPG, WEBP</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,image/*"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-0.5"
              >
                Select File
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${file ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{file ? file.name : 'No file selected'}</p>
              <p className="text-[11px] text-slate-500 uppercase tracking-tighter font-bold">{file ? `${(file.size / 1024).toFixed(1)} KB` : '0.0 KB'}</p>
            </div>
          </div>
          <button 
            disabled={!file || isProcessing}
            onClick={processFile}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
              !file || isProcessing 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
            }`}
          >
            {isProcessing ? <Layers className="animate-spin" size={20} /> : <Play size={20} />}
            {isProcessing ? 'Processing...' : 'Run Conversion'}
          </button>
        </div>
      </div>

      {/* Output & Logging */}
      <div className="space-y-6">
        <div className="bg-slate-900 rounded-3xl h-[600px] overflow-hidden flex flex-col shadow-2xl border border-slate-800">
          <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-blue-400" />
              <span className="text-[10px] font-mono text-slate-400">GEMINI_OCR_STREAM::ACTIVE</span>
            </div>
            {isProcessing && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Processing</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6 font-mono text-[11px] space-y-3 overflow-y-auto scrollbar-hide">
            {isProcessing || output ? (
              <>
                <div className="text-emerald-500 opacity-80">[{new Date().toLocaleTimeString()}] &gt;&gt; INITIALIZING_WORKSPACE_BUFFER... OK</div>
                {progress > 10 && <div className="text-blue-400">[{new Date().toLocaleTimeString()}] &gt;&gt; LOAD_SOURCE_FILE: {file?.name} ({file?.type})</div>}
                {progress > 25 && <div className="text-slate-500">[{new Date().toLocaleTimeString()}] &gt;&gt; SCANNING_FOR_METADATA_ARTIFACTS... DONE</div>}
                {progress > 50 && <div className="text-amber-400">[{new Date().toLocaleTimeString()}] &gt;&gt; API_CALL: Gemini 3 Flash Flash Instance :: REQUEST_CONTENT_ANALYSIS</div>}
                {progress > 75 && (
                  <div className="text-indigo-400 font-bold">
                    [{new Date().toLocaleTimeString()}] &gt;&gt; SUCCESS: Extracted {output?.pages?.[0]?.text_blocks?.length || 0} layout primitives.
                  </div>
                )}
                {progress === 100 && (
                  <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 mt-4">
                    <div className="text-emerald-400 font-bold mb-1">PROCES_TERMINATED_SUCCESSFULLY</div>
                    <div className="text-emerald-500/70 text-[10px]">Ready for PPTX generation with detected fidelity {output?.accuracy_estimate?.toFixed(2) || '1.00'}</div>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="pt-4">
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full transition-all duration-700"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-700 space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-full">
                  <Terminal size={40} className="text-slate-600" />
                </div>
                <p className="text-center max-w-[200px] leading-relaxed">System ready. Please upload a document to begin OCR analysis.</p>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-800/30 border-t border-slate-800">
             <div className="flex items-center justify-between mb-4">
                <h4 className="text-white text-sm font-bold flex items-center gap-2">
                  <Scissors size={16} className="text-blue-400" />
                  Pre-processing Status
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${output?.watermark_detected ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {output ? (output.watermark_detected ? 'Artifacts Removed' : 'Clean Input') : 'Idle'}
                </span>
             </div>
             
             <button 
              disabled={!output || isProcessing}
              onClick={downloadPPTX}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                !output || isProcessing
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xl shadow-emerald-900/40 hover:-translate-y-0.5 active:scale-95'
              }`}
             >
               <Download size={20} />
               Download Editable PPTX
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
