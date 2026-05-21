import React from 'react';

export default function OutputConsole({ consoleOutput }) {
  return (
    <div className="h-full flex flex-col bg-slate-950 border-t border-slate-900">
      <div className="h-10 bg-slate-900/50 px-4 border-b border-slate-900 flex items-center text-xs font-semibold tracking-wider text-slate-400 uppercase">
        Execution Console
      </div>
      <div className="flex-grow p-4 bg-slate-950 font-mono text-xs text-emerald-400 overflow-y-auto whitespace-pre-wrap leading-relaxed">
        {consoleOutput || "Terminal ready. Execute code to see output..."}
      </div>
    </div>
  );
}