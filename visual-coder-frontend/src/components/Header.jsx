// import React from 'react';
// import { Play, Layers } from 'lucide-react';

// export default function Header({ onRun, isLoading, blocks }) {
//   return (
//     <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shadow-md">
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
//           <Layers size={16} className="text-white" />
//         </div>
//         <div>
//           <span className="font-bold tracking-wide text-slate-200">VISUAL CODER IDE</span>
//           <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 font-medium border border-slate-700">Declarative Mode</span>
//         </div>
//       </div>
//       <button 
//         onClick={onRun}
//         disabled={isLoading || blocks.length === 0}
//         className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg text-sm font-bold text-white transition-all transform active:scale-95 shadow-md"
//       >
//         <Play size={14} fill="currentColor" /> Run Execution Engine
//       </button>
//     </header>
//   );
// }

import React from 'react';
import { Play, Layers, Code2 } from 'lucide-react';

export default function Header({ onRun, isLoading, blocks, language, setLanguage }) {
  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
          <Layers size={16} className="text-white" />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-wide text-slate-200">VISUCODE IDE</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 font-medium border border-slate-700">Declarative Mode</span>
          
          <div className="flex items-center gap-2 ml-4 border-l border-slate-700 pl-4">
            <Code2 size={14} className="text-slate-400" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 outline-none hover:border-indigo-500 cursor-pointer transition-colors font-medium"
            >
              <option value="javascript">JavaScript (Node)</option>
              <option value="python">Python</option>
            </select>
          </div>
        </div>
      </div>
      <button 
        onClick={onRun}
        disabled={isLoading || blocks.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg text-sm font-bold text-white transition-all transform active:scale-95 shadow-md"
      >
        <Play size={14} fill="currentColor" /> Run Execution Engine
      </button>
    </header>
  );
}