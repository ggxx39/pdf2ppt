
import React, { useState } from 'react';
import { CoTLog } from '../types';
import { Search, Filter, Terminal, ChevronRight, Clock, ShieldCheck, AlertTriangle, Info } from 'lucide-react';

const LogPanel: React.FC<{ logs: CoTLog[] }> = ({ logs }) => {
  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(log => 
    log.reasoning.toLowerCase().includes(filter.toLowerCase()) || 
    log.step.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search reasoning logs..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100 hover:bg-slate-100">
            <Filter size={14} />
            Filter by Step
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
            <Terminal size={14} />
            Export JSON
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-40">Timestamp</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-32">Module</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Reasoning & Logic Path</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-48">Resulting Action</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-24">Conf.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-24 text-center text-slate-400">
                  <Terminal size={32} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm">No audit logs available for current session.</p>
                </td>
              </tr>
            ) : (
              filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                      <Clock size={12} />
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                      {log.step}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        {log.status === 'success' && <ShieldCheck size={16} className="text-emerald-500" />}
                        {log.status === 'warning' && <AlertTriangle size={16} className="text-amber-500" />}
                        {log.status === 'info' && <Info size={16} className="text-blue-500" />}
                        {log.status === 'error' && <AlertTriangle size={16} className="text-red-500" />}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed max-w-xl">
                        {log.reasoning}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                      <ChevronRight size={14} className="text-slate-400" />
                      {log.action}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${log.confidence > 0.9 ? 'bg-emerald-500' : log.confidence > 0.7 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${log.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block font-bold">{(log.confidence * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogPanel;
