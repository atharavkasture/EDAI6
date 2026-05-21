import React, { useState } from 'react';
import { Code, CheckCircle } from 'lucide-react';

export default function CodeEditor({ blocks, activeBlockId, setActiveBlockId, onSaveCode }) {
  const [editingCodeId, setEditingCodeId] = useState(null);
  const [editedCodeValue, setEditedCodeValue] = useState('');

  const handleEditInit = (e, block) => {
    e.stopPropagation();
    setActiveBlockId(block.id);
    setEditingCodeId(block.id);
    setEditedCodeValue(block.code);
  };

  const handleSave = (id) => {
    onSaveCode(id, editedCodeValue);
    setEditingCodeId(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <div className="h-10 bg-slate-900/50 px-4 border-b border-slate-900 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
        <Code size={12} className="text-indigo-500" /> Compiled Syntax
      </div>
      <div className="flex-grow p-4 overflow-y-auto font-mono text-sm bg-slate-950/50 space-y-4">
        {blocks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-600 text-xs italic">
            {"// Code will appear here"}
          </div>
        ) : (
          blocks.map((block) => (
            <div 
              key={block.id}
              onClick={() => {
                setActiveBlockId(block.id);
                if (editingCodeId !== block.id) setEditingCodeId(null);
              }}
              className={`p-3 rounded-xl border font-mono transition-all cursor-pointer 
                ${activeBlockId === block.id 
                  ? 'bg-indigo-950/40 border-indigo-500/70 text-indigo-200' 
                  : 'bg-slate-900/30 border-transparent text-slate-400 hover:bg-slate-900/20'
                }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-600 text-xs select-none">// {block.step}</span>
                {editingCodeId !== block.id && (
                  <button 
                    onClick={(e) => handleEditInit(e, block)}
                    className="text-[10px] text-indigo-400 font-bold uppercase px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-indigo-900/50"
                  >
                    Edit Code
                  </button>
                )}
              </div>
              
              {editingCodeId === block.id ? (
                <div className="flex flex-col gap-2 mt-2">
                  <textarea 
                    value={editedCodeValue}
                    onChange={(e) => setEditedCodeValue(e.target.value)}
                    className="w-full bg-slate-950 border border-indigo-500/50 rounded p-2 text-sm outline-none text-slate-200 font-mono resize-y min-h-[80px]"
                    onClick={(e) => e.stopPropagation()}
                    spellCheck="false"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleSave(block.id); }}
                    className="self-end px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-1 text-xs font-bold"
                  >
                    <CheckCircle size={14} /> Sync Logic
                  </button>
                </div>
              ) : (
                <div className="whitespace-pre">{block.code}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}