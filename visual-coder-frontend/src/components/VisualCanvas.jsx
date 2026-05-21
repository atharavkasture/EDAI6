// import React from 'react';
// import { Eye } from 'lucide-react';

// export default function VisualCanvas({ blocks, activeBlockId, setActiveBlockId }) {
//   return (
//     <div className="h-full flex flex-col bg-slate-950 border-r border-slate-900">
//       <div className="h-10 bg-slate-900/50 px-4 border-b border-slate-900 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
//         <Eye size={12} className="text-blue-500" /> Logic Flow
//       </div>
//       <div className="flex-grow p-6 overflow-y-auto flex flex-col items-center gap-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
//         {blocks.length === 0 ? (
//           <div className="my-auto text-center p-6 border-2 border-dashed border-slate-800 rounded-xl text-sm text-slate-500 max-w-[200px]">
//             Flowchart generates automatically.
//           </div>
//         ) : (
//           blocks.map((block, idx) => (
//             <React.Fragment key={block.id}>
//               <div 
//                 onClick={() => setActiveBlockId(block.id)}
//                 className={`w-48 p-3 rounded-xl border text-center transition-all cursor-pointer shadow-md flex flex-col items-center justify-center gap-1
//                   ${activeBlockId === block.id 
//                     ? 'bg-blue-950/80 border-blue-500 scale-105 ring-2 ring-blue-500/20' 
//                     : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
//                   }`}
//               >
//                 <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase tracking-widest">{block.type}</span>
//                 <p className="text-xs font-medium text-slate-300 line-clamp-2 leading-relaxed">{block.step}</p>
//               </div>
//               {idx !== blocks.length - 1 && (
//                 <div className={`w-0.5 h-6 transition-colors ${activeBlockId === block.id ? 'bg-blue-500' : 'bg-slate-800'}`} />
//               )}
//             </React.Fragment>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// For the explanation part 

import React from 'react';
import { Eye, HelpCircle } from 'lucide-react';

export default function VisualCanvas({ blocks, activeBlockId, setActiveBlockId, explanations, onExplain }) {
  return (
    <div className="h-full flex flex-col bg-slate-950 border-r border-slate-900">
      <div className="h-10 bg-slate-900/50 px-4 border-b border-slate-900 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
        <Eye size={12} className="text-blue-500" /> Logic Flow
      </div>
      <div className="flex-grow p-6 overflow-y-auto flex flex-col items-center gap-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
        {blocks.length === 0 ? (
          <div className="my-auto text-center p-6 border-2 border-dashed border-slate-800 rounded-xl text-sm text-slate-500 max-w-[200px]">
            Flowchart generates automatically.
          </div>
        ) : (
          blocks.map((block, idx) => (
            <React.Fragment key={block.id}>
              <div 
                onClick={() => setActiveBlockId(block.id)}
                className={`w-56 p-3 rounded-xl border text-center transition-all cursor-pointer shadow-md flex flex-col items-center justify-center gap-1
                  ${activeBlockId === block.id 
                    ? 'bg-blue-950/80 border-blue-500 scale-105 ring-2 ring-blue-500/20' 
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
              >
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase tracking-widest">{block.type}</span>
                <p className="text-xs font-medium text-slate-300 line-clamp-2 leading-relaxed">{block.step}</p>
                
                {/* NEW FEATURE: Explainer Button */}
                {activeBlockId === block.id && !explanations[block.id] && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onExplain(block); }}
                    className="mt-2 text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-2 py-1.5 rounded flex items-center justify-center gap-1 transition-colors w-full"
                  >
                    <HelpCircle size={12} /> Explain Logic
                  </button>
                )}

                {/* NEW FEATURE: Explanation Text Display */}
                {explanations[block.id] && (
                  <div className="mt-2 p-2 bg-slate-950/80 border border-blue-900/50 rounded flex flex-col gap-1 w-full text-left">
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">AI Summary</span>
                    <p className="text-[10px] text-blue-200 leading-relaxed font-medium">
                      {explanations[block.id]}
                    </p>
                  </div>
                )}
              </div>
              {idx !== blocks.length - 1 && (
                <div className={`w-0.5 h-6 transition-colors ${activeBlockId === block.id ? 'bg-blue-500' : 'bg-slate-800'}`} />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}