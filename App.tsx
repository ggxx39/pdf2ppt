
import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  FileUp, 
  ListTree, 
  ShieldAlert, 
  Play, 
  Download,
  Terminal,
  Cpu,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { AppConfig, OCRModel, CoTLog } from './types';
// ⚡ Bolt Optimization: Lazy load heavy tab components to reduce initial bundle size.
// Workspace uses pptxgenjs, Dashboard uses recharts. Lazy loading splits these into separate chunks.
const Dashboard = lazy(() => import('./components/Dashboard'));
const Workspace = lazy(() => import('./components/Workspace'));
const ConfigEditor = lazy(() => import('./components/ConfigEditor'));
const LogPanel = lazy(() => import('./components/LogPanel'));

const DEFAULT_CONFIG: AppConfig = {
  ocr: {
    default_model: OCRModel.PADDLE,
    fallback_enabled: true,
    accuracy_threshold: 0.90,
  },
  processing: {
    watermark_detection_confidence: 0.85,
    preserve_pixel_fidelity: true,
    enable_translation: false,
    target_language: "English",
  },
  logging: {
    chain_of_thought: true,
    adversarial_mode: false,
  },
  cost_management: {
    max_api_calls_per_day: 1000,
    auto_switch_threshold: 50,
    api_calls_today: 12,
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workspace' | 'config' | 'logs'>('dashboard');
  
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('omniconv_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [logs, setLogs] = useState<CoTLog[]>(() => {
    const saved = localStorage.getItem('omniconv_logs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('omniconv_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('omniconv_logs', JSON.stringify(logs));
  }, [logs]);

  const addLog = useCallback((log: Omit<CoTLog, 'id' | 'timestamp'>) => {
    setLogs(prev => [
      {
        ...log,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      },
      ...prev
    ].slice(0, 100));
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Cpu className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">OmniConv</h1>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Modular OCR v1.2</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<FileUp size={20} />} 
            label="Workspace" 
            active={activeTab === 'workspace'} 
            onClick={() => setActiveTab('workspace')} 
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Configuration" 
            active={activeTab === 'config'} 
            onClick={() => setActiveTab('config')} 
          />
          <SidebarItem 
            icon={<Terminal size={20} />} 
            label="Audit Logs (CoT)" 
            active={activeTab === 'logs'} 
            onClick={() => setActiveTab('logs')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold">API Usage</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">Tier 1</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mb-1">
              <div 
                className="bg-blue-500 h-full rounded-full" 
                style={{ width: `${(config.cost_management.api_calls_today / config.cost_management.auto_switch_threshold) * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500">{config.cost_management.api_calls_today} / {config.cost_management.auto_switch_threshold} API Calls</p>
          </div>
          
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-full px-2">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col relative">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {activeTab === 'config' ? 'System Configuration' : activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-medium bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Paddle Engine: Ready
            </div>
            <div className="flex items-center gap-2 text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
              Gemini Pro: Connected
            </div>
          </div>
        </header>

        <div className="p-8 h-full flex-1">
          <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-slate-500">Loading component...</div>}>
            {activeTab === 'dashboard' && <Dashboard config={config} logs={logs} />}
            {activeTab === 'workspace' && <Workspace config={config} addLog={addLog} />}
            {activeTab === 'config' && <ConfigEditor config={config} setConfig={setConfig} />}
            {activeTab === 'logs' && <LogPanel logs={logs} />}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
        : 'hover:bg-slate-800 text-slate-400'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default App;
