
import React from 'react';
import { AppConfig, CoTLog } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, ShieldCheck, DollarSign } from 'lucide-react';

const MOCK_STATS = [
  { name: 'Mon', accuracy: 92, cost: 0.05 },
  { name: 'Tue', accuracy: 88, cost: 0.12 },
  { name: 'Wed', accuracy: 95, cost: 0.08 },
  { name: 'Thu', accuracy: 91, cost: 0.15 },
  { name: 'Fri', accuracy: 94, cost: 0.07 },
  { name: 'Sat', accuracy: 96, cost: 0.04 },
  { name: 'Sun', accuracy: 93, cost: 0.06 },
];

const Dashboard: React.FC<{ config: AppConfig; logs: CoTLog[] }> = ({ config, logs }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Zap className="text-amber-500" />} 
          label="Conversion Speed" 
          value="1.2s" 
          change="-0.4s" 
          positive 
        />
        <StatCard 
          icon={<Activity className="text-blue-500" />} 
          label="OCR Accuracy" 
          value="94.2%" 
          change="+1.5%" 
          positive 
        />
        <StatCard 
          icon={<DollarSign className="text-emerald-500" />} 
          label="Estimated Savings" 
          value="$142.50" 
          change="Paddle fallback active" 
        />
        <StatCard 
          icon={<ShieldCheck className="text-indigo-500" />} 
          label="Watermark Clear Rate" 
          value="99.8%" 
          change="+0.2%" 
          positive 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Model Performance</h3>
              <p className="text-sm text-slate-500">Weekly accuracy vs. cost metrics</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Accuracy (%)
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                Cost ($)
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_STATS}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
                <Area type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent CoT Reasoning</h3>
          <div className="space-y-4">
            {logs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-sm">No recent activity</p>
              </div>
            ) : (
              logs.slice(0, 5).map(log => (
                <div key={log.id} className="group border-l-2 border-slate-200 pl-4 py-1 hover:border-blue-500 transition-colors">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{log.step}</p>
                  <p className="text-xs text-slate-600 line-clamp-2">{log.reasoning}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{log.action}</span>
                    <span className="text-[10px] text-slate-400 italic">{(log.confidence * 100).toFixed(0)}% conf</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; change: string; positive?: boolean }> = ({ icon, label, value, change, positive }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-slate-50 rounded-xl">{icon}</div>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${positive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
        {change}
      </span>
    </div>
    <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

export default Dashboard;
