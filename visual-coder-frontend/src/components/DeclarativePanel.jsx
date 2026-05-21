import React, { useState } from 'react';
import { MessageSquare, Sparkles, RefreshCw, CheckCircle } from 'lucide-react';

export default function DeclarativePanel({ 
  prompt, setPrompt, isLoading, onGenerate, 
  blocks, activeBlockId, setActiveBlockId, onSaveStep 
}) {
  const [editingBlockId, setEditingBlockId] = useState(null);
  const [editedStepValue, setEditedStepValue] = useState('');

  const handleEditInit = (e, block) => {
    e.stopPropagation();
    setEditingBlockId(block.id);
    setEditedStepValue(block.step);
  };

  const handleSave = (id) => {
    onSaveStep(id, editedStepValue);
    setEditingBlockId(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 border-l border-slate-900">
      <div className="h-10 bg-slate-900/50 px-4 border-b border-slate-900 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
        <MessageSquare size={12} className="text-purple-500" /> AI Steps
      </div>
      
      <div className="p-4 border-b border-slate-900 bg-slate-900/20">
        <form onSubmit={onGenerate} className="relative">
          <input 
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Check if array values are even..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl pl-4 pr-12 py-3 text-sm outline-none text-slate-200 shadow-inner font-medium"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute right-2 top-2 p-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-500 disabled:bg-slate-800 transition-colors"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
          </button>
        </form>
      </div>

      <div className="flex-grow p-4 overflow-y-auto space-y-3">
        {blocks.map((block) => (
          <div 
            key={block.id}
            onClick={() => setActiveBlockId(block.id)}
            className={`p-3 rounded-xl border text-sm transition-all cursor-pointer flex flex-col gap-2
              ${activeBlockId === block.id 
                ? 'bg-purple-950/40 border-purple-500 shadow-md' 
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
          >
            {editingBlockId === block.id ? (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="text"
                  value={editedStepValue}
                  onChange={(e) => setEditedStepValue(e.target.value)}
                  className="flex-grow bg-slate-950 border border-purple-500 rounded-lg px-2 py-1 text-xs outline-none text-slate-200"
                  autoFocus
                />
                <button onClick={() => handleSave(block.id)} className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500">
                  <CheckCircle size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-slate-300 leading-relaxed">{block.step}</p>
                <button 
                  onClick={(e) => handleEditInit(e, block)}
                  className="text-[10px] text-purple-400 font-bold uppercase px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-purple-900/50"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}