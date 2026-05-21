// // import React, { useState } from 'react';
// // import confetti from 'canvas-confetti';
// // import Header from './components/Header';
// // import VisualCanvas from './components/VisualCanvas';
// // import CodeEditor from './components/CodeEditor';
// // import OutputConsole from './components/OutputConsole';
// // import DeclarativePanel from './components/DeclarativePanel';

// // const BACKEND_URL = 'http://localhost:3002';

// // export default function App() {
// //   const [prompt, setPrompt] = useState('');
// //   const [blocks, setBlocks] = useState([]);
// //   const [activeBlockId, setActiveBlockId] = useState(null);
// //   const [consoleOutput, setConsoleOutput] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSaveCodeModification = async (id, newCode) => {
// //     setIsLoading(true);
// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/update-from-code`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ targetBlockId: id, updatedCode: newCode, fullBlockContext: blocks })
// //       });
// //       const data = await res.json();
// //       if (data.blocks) setBlocks(data.blocks);
// //     } catch (err) {
// //       alert("Error generating step from code.");
// //     }
// //     setIsLoading(false);
// //   };

// //   const handleGenerateWorkflow = async (e) => {
// //     e.preventDefault();
// //     if (!prompt.trim()) return;
// //     setIsLoading(true);
// //     setConsoleOutput('');
// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/generate-blocks`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ prompt })
// //       });
// //       const data = await res.json();
// //       if (data.blocks && Array.isArray(data.blocks)) {
// //         setBlocks(data.blocks);
// //         confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
// //       } else {
// //         alert("Unexpected format from AI.");
// //       }
// //     } catch (err) {
// //       alert("Backend connection offline.");
// //     }
// //     setIsLoading(false);
// //   };

// //   const handleSaveStepModification = async (id, newStepText) => {
// //     setIsLoading(true);
// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/update-block`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ targetBlockId: id, updatedStepText: newStepText, fullBlockContext: blocks })
// //       });
// //       const data = await res.json();
// //       if (data.blocks) setBlocks(data.blocks);
// //     } catch (err) {
// //       alert("Error modifying steps.");
// //     }
// //     setIsLoading(false);
// //   };

// //   const handleRunProgramCode = async () => {
// //     if (blocks.length === 0) return;
// //     setIsLoading(true);
// //     try {
// //       const res = await fetch(`${BACKEND_URL}/api/run-code`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ code: blocks.map(b => b.code).join('\n') })
// //       });
// //       const data = await res.json();
// //       setConsoleOutput(data.output);
// //     } catch (err) {
// //       setConsoleOutput("Execution error.");
// //     }
// //     setIsLoading(false);
// //   };

// //   return (
// //     <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
// //       <Header onRun={handleRunProgramCode} isLoading={isLoading} blocks={blocks} />

// //       {/* STANDARD TAILWIND FLEXBOX LAYOUT */}
// //       <main className="flex-grow flex w-full h-full relative overflow-hidden bg-slate-950">
        
// //         {/* Left Panel */}
// //         <div className="w-[30%] h-full border-r border-slate-900 bg-slate-950">
// //           <VisualCanvas blocks={blocks} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} />
// //         </div>

// //         {/* Middle Panel */}
// //         <div className="w-[40%] h-full flex flex-col border-r border-slate-900 bg-slate-950">
// //           <div className="h-[65%] border-b border-slate-900 overflow-hidden">
// //             <CodeEditor blocks={blocks} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} onSaveCode={handleSaveCodeModification} />
// //           </div>
// //           <div className="h-[35%] overflow-hidden">
// //             <OutputConsole consoleOutput={consoleOutput} />
// //           </div>
// //         </div>

// //         {/* Right Panel */}
// //         <div className="w-[30%] h-full bg-slate-950">
// //           <DeclarativePanel prompt={prompt} setPrompt={setPrompt} isLoading={isLoading} onGenerate={handleGenerateWorkflow} blocks={blocks} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} onSaveStep={handleSaveStepModification} />
// //         </div>

// //       </main>
// //     </div>
// //   );
// // }

// import React, { useState } from 'react';
// import confetti from 'canvas-confetti';
// import Header from './components/Header';
// import VisualCanvas from './components/VisualCanvas';
// import CodeEditor from './components/CodeEditor';
// import OutputConsole from './components/OutputConsole';
// import DeclarativePanel from './components/DeclarativePanel';

// const BACKEND_URL = 'http://localhost:3002';

// export default function App() {
//   const [prompt, setPrompt] = useState('');
//   const [blocks, setBlocks] = useState([]);
//   const [activeBlockId, setActiveBlockId] = useState(null);
//   const [consoleOutput, setConsoleOutput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [language, setLanguage] = useState('javascript'); // NEW LANGUAGE STATE

//   const handleSaveCodeModification = async (id, newCode) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/update-from-code`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ targetBlockId: id, updatedCode: newCode, fullBlockContext: blocks, language })
//       });
//       const data = await res.json();
//       if (data.blocks) setBlocks(data.blocks);
//     } catch (err) {
//       alert("Error generating step from code.");
//     }
//     setIsLoading(false);
//   };

//   const handleGenerateWorkflow = async (e) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;
//     setIsLoading(true);
//     setConsoleOutput('');
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/generate-blocks`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt, language })
//       });
//       const data = await res.json();
//       if (data.blocks && Array.isArray(data.blocks)) {
//         setBlocks(data.blocks);
//         confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
//       } else {
//         alert("Unexpected format from AI.");
//       }
//     } catch (err) {
//       alert("Backend connection offline.");
//     }
//     setIsLoading(false);
//   };

//   const handleSaveStepModification = async (id, newStepText) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/update-block`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ targetBlockId: id, updatedStepText: newStepText, fullBlockContext: blocks, language })
//       });
//       const data = await res.json();
//       if (data.blocks) setBlocks(data.blocks);
//     } catch (err) {
//       alert("Error modifying steps.");
//     }
//     setIsLoading(false);
//   };

//   const handleRunProgramCode = async () => {
//     if (blocks.length === 0) return;
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/run-code`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code: blocks.map(b => b.code).join('\n'), language })
//       });
//       const data = await res.json();
//       setConsoleOutput(data.output);
//     } catch (err) {
//       setConsoleOutput("Execution error.");
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
//       <Header 
//         onRun={handleRunProgramCode} 
//         isLoading={isLoading} 
//         blocks={blocks} 
//         language={language}
//         setLanguage={setLanguage}
//       />

//       <main className="flex-grow flex w-full h-full relative overflow-hidden bg-slate-950">
//         <div className="w-[30%] h-full border-r border-slate-900 bg-slate-950">
//           <VisualCanvas blocks={blocks} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} />
//         </div>
//         <div className="w-[40%] h-full flex flex-col border-r border-slate-900 bg-slate-950">
//           <div className="h-[65%] border-b border-slate-900 overflow-hidden">
//             <CodeEditor blocks={blocks} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} onSaveCode={handleSaveCodeModification} />
//           </div>
//           <div className="h-[35%] overflow-hidden">
//             <OutputConsole consoleOutput={consoleOutput} />
//           </div>
//         </div>
//         <div className="w-[30%] h-full bg-slate-950">
//           <DeclarativePanel prompt={prompt} setPrompt={setPrompt} isLoading={isLoading} onGenerate={handleGenerateWorkflow} blocks={blocks} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} onSaveStep={handleSaveStepModification} />
//         </div>
//       </main>
//     </div>
//   );
// }

// For the explanation part 

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import VisualCanvas from './components/VisualCanvas';
import CodeEditor from './components/CodeEditor';
import OutputConsole from './components/OutputConsole';
import DeclarativePanel from './components/DeclarativePanel';

const BACKEND_URL = 'http://localhost:3002';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [activeBlockId, setActiveBlockId] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript'); 
  
  // NEW STATE: Tracks explanations for individual blocks
  const [explanations, setExplanations] = useState({});

  const handleSaveCodeModification = async (id, newCode) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/update-from-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetBlockId: id, updatedCode: newCode, fullBlockContext: blocks, language })
      });
      const data = await res.json();
      if (data.blocks) setBlocks(data.blocks);
    } catch (err) {
      alert("Error generating step from code.");
    }
    setIsLoading(false);
  };

  const handleGenerateWorkflow = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);
    setConsoleOutput('');
    setExplanations({}); // Clear old explanations on new generation
    try {
      const res = await fetch(`${BACKEND_URL}/api/generate-blocks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, language })
      });
      const data = await res.json();
      if (data.blocks && Array.isArray(data.blocks)) {
        setBlocks(data.blocks);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
      } else {
        alert("Unexpected format from AI.");
      }
    } catch (err) {
      alert("Backend connection offline.");
    }
    setIsLoading(false);
  };

  // NEW FUNCTION: Fetch explanation for a block
  const handleExplainBlock = async (block) => {
    setExplanations(prev => ({ ...prev, [block.id]: "Analyzing logic..." }));
    try {
      const res = await fetch(`${BACKEND_URL}/api/explain-block`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: block.code, step: block.step, language })
      });
      const data = await res.json();
      setExplanations(prev => ({ ...prev, [block.id]: data.explanation }));
    } catch (err) {
      setExplanations(prev => ({ ...prev, [block.id]: "Error generating explanation." }));
    }
  };

  const handleSaveStepModification = async (id, newStepText) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/update-block`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetBlockId: id, updatedStepText: newStepText, fullBlockContext: blocks, language })
      });
      const data = await res.json();
      if (data.blocks) setBlocks(data.blocks);
    } catch (err) {
      alert("Error modifying steps.");
    }
    setIsLoading(false);
  };

  const handleRunProgramCode = async () => {
    if (blocks.length === 0) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/run-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: blocks.map(b => b.code).join('\n'), language })
      });
      const data = await res.json();
      setConsoleOutput(data.output);
    } catch (err) {
      setConsoleOutput("Execution error.");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      <Header 
        onRun={handleRunProgramCode} 
        isLoading={isLoading} 
        blocks={blocks} 
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-grow flex w-full h-full relative overflow-hidden bg-slate-950">
        <div className="w-[30%] h-full border-r border-slate-900 bg-slate-950">
          <VisualCanvas 
            blocks={blocks} 
            activeBlockId={activeBlockId} 
            setActiveBlockId={setActiveBlockId} 
            explanations={explanations} 
            onExplain={handleExplainBlock} 
          />
        </div>
        <div className="w-[40%] h-full flex flex-col border-r border-slate-900 bg-slate-950">
          <div className="h-[65%] border-b border-slate-900 overflow-hidden">
            <CodeEditor blocks={blocks} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} onSaveCode={handleSaveCodeModification} />
          </div>
          <div className="h-[35%] overflow-hidden">
            <OutputConsole consoleOutput={consoleOutput} />
          </div>
        </div>
        <div className="w-[30%] h-full bg-slate-950">
          <DeclarativePanel prompt={prompt} setPrompt={setPrompt} isLoading={isLoading} onGenerate={handleGenerateWorkflow} blocks={blocks} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} onSaveStep={handleSaveStepModification} />
        </div>
      </main>
    </div>
  );
}