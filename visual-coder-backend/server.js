// // require('dotenv').config();
// // const express = require('express');
// // const cors = require('cors');
// // const axios = require('axios');

// // const app = express();
// // const PORT = 3002;
// // const LM_STUDIO_URL = 'http://localhost:1234/v1/chat/completions';

// // app.use(cors({ origin: 'http://localhost:5173' }));
// // app.use(express.json());

// // const IDE_SYSTEM_PROMPT = `You are the core logic generator for a Visual IDE.
// // Your task is to convert code requests into a strict block-by-block structured workflow.

// // For any task, output ONLY a raw JSON array of blocks. Do not wrap the JSON in markdown formatting like \`\`\`json ... \`\`\`. Do not include conversational text.

// // Each object in the array must have exactly these keys:
// // - "id": a string sequence (e.g., "b1", "b2", "b3")
// // - "step": A short, clear English instruction detailing what this block accomplishes.
// // - "code": The precise executable JavaScript code line(s) for this step. Use clean indentation.
// // - "type": Choose exactly one of these types: "start" | "process" | "condition" | "loop" | "end"

// // Example Structure:
// // [
// //   {"id": "b1", "step": "Initialize values", "code": "let total = 0;\nlet count = 5;", "type": "start"},
// //   {"id": "b2", "step": "Compute average", "code": "let avg = total / count;", "type": "process"}
// // ]`;

// // app.post('/api/generate-blocks', async (req, res) => {
// //     const { prompt } = req.body;
// //     if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

// //     try {
// //         console.log(`🤖 Prompt: "${prompt}"`);
// //         const response = await axios.post(LM_STUDIO_URL, {
// //             model: "qwen2.5-coder-7b-instruct",
// //             messages: [
// //                 { role: "system", content: IDE_SYSTEM_PROMPT },
// //                 { role: "user", content: `Generate JSON logic steps for: "${prompt}"` }
// //             ],
// //             temperature: 0.2
// //         });

// //         let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
// //         res.json({ blocks: JSON.parse(cleanJson) });
// //     } catch (err) {
// //         console.error("❌ LM Studio Error:", err.message);
// //         res.status(500).json({ error: "Failed to build steps. Is LM Studio running on port 1234?" });
// //     }
// // });

// // app.post('/api/update-block', async (req, res) => {
// //     const { targetBlockId, updatedStepText, fullBlockContext } = req.body;
// //     try {
// //         const updatePrompt = `Update a single step inside this context:\n${JSON.stringify(fullBlockContext)}\n\nModify the block where "id" is "${targetBlockId}". Change "step" to: "${updatedStepText}". Regenerate its "code" to match this new description perfectly, keeping variable names consistent. Output the full updated JSON array ONLY.`;

// //         const response = await axios.post(LM_STUDIO_URL, {
// //             model: "qwen2.5-coder-7b-instruct",
// //             messages: [
// //                 { role: "system", content: IDE_SYSTEM_PROMPT },
// //                 { role: "user", content: updatePrompt }
// //             ],
// //             temperature: 0.1
// //         });

// //         let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
// //         res.json({ blocks: JSON.parse(cleanJson) });
// //     } catch (err) {
// //         res.status(500).json({ error: "Failed to recalculate step." });
// //     }
// // });

// // // --- ROUTE: REGENERATE ENGLISH STEP FROM CODE (Vice Versa) ---
// // app.post('/api/update-from-code', async (req, res) => {
// //     const { targetBlockId, updatedCode, fullBlockContext } = req.body;

// //     try {
// //         const updatePrompt = `Update a single step's English description inside this context based on its new code:
// // ${JSON.stringify(fullBlockContext)}

// // The user manually changed the "code" for the block where "id" is "${targetBlockId}" to the following:
// // ${updatedCode}

// // Analyze the new code. Update the "step" text for this specific block to accurately describe what the new code is doing in one short, clear sentence. Keep the "code" property exactly as the user wrote it.
// // Output ONLY the full updated JSON array of blocks. Do not add any markdown formatting.`;

// //         const response = await axios.post(LM_STUDIO_URL, {
// //             model: "qwen2.5-coder-7b-instruct",
// //             messages: [
// //                 { role: "system", content: IDE_SYSTEM_PROMPT },
// //                 { role: "user", content: updatePrompt }
// //             ],
// //             temperature: 0.1
// //         });

// //         let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
// //         res.json({ blocks: JSON.parse(cleanJson) });
// //     } catch (err) {
// //         console.error("❌ Code-to-Step adjustment failed:", err.message);
// //         res.status(500).json({ error: "Failed to recalculate English step from code." });
// //     }
// // });

// // app.post('/api/run-code', (req, res) => {
// //     const { code } = req.body;
// //     let outputs = [];
// //     const originalLog = console.log;
// //     console.log = (...args) => { outputs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')); };

// //     try {
// //         eval(code);
// //         console.log = originalLog;
// //         res.json({ output: outputs.join('\n') || "Program ran successfully." });
// //     } catch (evalError) {
// //         console.log = originalLog;
// //         res.json({ output: `Runtime Error: ${evalError.message}` });
// //     }
// // });

// // app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));

// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// const { exec } = require('child_process');
// const fs = require('fs');

// const app = express();
// const PORT = 3002;
// const LM_STUDIO_URL = 'http://localhost:1234/v1/chat/completions';

// app.use(cors({ origin: 'http://localhost:5173' }));
// app.use(express.json());

// // AGGRESSIVELY UPDATED PROMPT FOR GRANULARITY
// const IDE_SYSTEM_PROMPT = `You are the core logic generator for a visual-textual programming environment.
// Your task is to convert code requests into a strict block-by-block structured workflow.

// CRITICAL RULES FOR GRANULARITY & EXECUTION:
// 1. NEVER lump an entire algorithm, function, or loop into a single block.
// 2. You MUST break down the internal modular logic. If generating a sorting algorithm, create separate blocks for initializing the pivot, the partition while-loops, swapping elements, and the recursive calls.
// 3. The code will execute in a strict headless backend environment. NEVER use user input pauses like Python's input() or JS prompt(). Hardcode mock data variables for testing (e.g., arr = [5,2,9,1]).
// 4: If the user asks for a specific algorithm or function, you MUST automatically include a final block that initializes mock data, calls the function, and prints the result. Never just define a function without testing it.

// For any task, output ONLY a raw JSON array of blocks. Do not wrap the JSON in markdown formatting.

// Each object in the array must have exactly these keys:
// - "id": a string sequence (e.g., "b1", "b2", "b3")
// - "step": A short, clear English instruction detailing the granular step.
// - "code": The precise executable code line(s) for this specific step. Use proper indentation.
// - "type": "start" | "process" | "condition" | "loop" | "end"`;

// app.post('/api/generate-blocks', async (req, res) => {
//     const { prompt, language } = req.body;
//     if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

//     // const langRule = language === 'python' 
//     //     ? `Write the code in Python. Ensure proper whitespace indentation.` 
//     //     : `Write the code in JavaScript for a Node.js environment.`;
//     const langRule = language === 'python' 
//         ? `Write the code in Python. CRITICAL: You MUST include the leading spaces (indentation) directly inside the 'code' string for nested blocks (e.g., inside functions or loops) so it remains valid when parsed.` 
//         : `Write the code in JavaScript for a Node.js environment.`;

//     try {
//         console.log(`🤖 Prompt: "${prompt}" | Lang: ${language}`);
//         const response = await axios.post(LM_STUDIO_URL, {
//             model: "qwen2.5-coder-7b-instruct",
//             messages: [
//                 { role: "system", content: `${IDE_SYSTEM_PROMPT}\n\nCRITICAL LANGUAGE RULE: ${langRule}` },
//                 { role: "user", content: `Generate JSON logic steps for: "${prompt}"` }
//             ],
//             temperature: 0.1
//         });

//         let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
//         res.json({ blocks: JSON.parse(cleanJson) });
//     } catch (err) {
//         console.error("❌ LM Studio Error:", err.message);
//         res.status(500).json({ error: "Failed to build steps." });
//     }
// });

// app.post('/api/update-block', async (req, res) => {
//     const { targetBlockId, updatedStepText, fullBlockContext, language } = req.body;
//     try {
//         const updatePrompt = `Update a single step inside this context:\n${JSON.stringify(fullBlockContext)}\n\nModify the block where "id" is "${targetBlockId}". Change "step" to: "${updatedStepText}". Regenerate its "code" to match this new description perfectly in ${language}. Output the full updated JSON array ONLY.`;

//         const response = await axios.post(LM_STUDIO_URL, {
//             model: "qwen2.5-coder-7b-instruct",
//             messages: [
//                 { role: "system", content: IDE_SYSTEM_PROMPT },
//                 { role: "user", content: updatePrompt }
//             ],
//             temperature: 0.1
//         });

//         let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
//         res.json({ blocks: JSON.parse(cleanJson) });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to recalculate step." });
//     }
// });

// app.post('/api/update-from-code', async (req, res) => {
//     const { targetBlockId, updatedCode, fullBlockContext } = req.body;
//     try {
//         const updatePrompt = `Update a single step's English description inside this context based on its new code:
// ${JSON.stringify(fullBlockContext)}

// The user manually changed the "code" for block "${targetBlockId}" to:
// ${updatedCode}

// Analyze the new code. Update the "step" text to accurately describe what the new code does. Keep the "code" exactly as the user wrote it. Output ONLY the full updated JSON array.`;

//         const response = await axios.post(LM_STUDIO_URL, {
//             model: "qwen2.5-coder-7b-instruct",
//             messages: [
//                 { role: "system", content: IDE_SYSTEM_PROMPT },
//                 { role: "user", content: updatePrompt }
//             ],
//             temperature: 0.1
//         });

//         let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
//         res.json({ blocks: JSON.parse(cleanJson) });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to recalculate English step from code." });
//     }
// });

// // MULTI-LANGUAGE EXECUTION ENGINE
// // app.post('/api/run-code', (req, res) => {
// //     const { code, language } = req.body;

// //     if (language === 'javascript') {
// //         let outputs = [];
// //         const originalLog = console.log;
// //         console.log = (...args) => { outputs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')); };

// //         try {
// //             eval(code);
// //             console.log = originalLog;
// //             res.json({ output: outputs.join('\n') || "Program ran successfully." });
// //         } catch (evalError) {
// //             console.log = originalLog;
// //             res.json({ output: `Runtime Error: ${evalError.message}` });
// //         }
// //     } 
// //     else if (language === 'python') {
// //         // Write the Python code to a temporary file
// //         fs.writeFileSync('Main.py', code);

// //         // Execute the python file using the OS terminal
// //         exec('python Main.py', (error, stdout, stderr) => {
// //             // Clean up the file immediately
// //             if (fs.existsSync('Main.py')) fs.unlinkSync('Main.py');

// //             if (error) {
// //                 return res.json({ output: `Python Error:\n${stderr}` });
// //             }
// //             res.json({ output: stdout || "Program ran successfully." });
// //         });
// //     }
// // });

// // MULTI-LANGUAGE EXECUTION ENGINE
// app.post('/api/run-code', async (req, res) => { // <-- Note the 'async' here
//     const { code, language } = req.body;

//     if (language === 'javascript') {
//         let outputs = [];
//         const originalLog = console.log;
//         console.log = (...args) => { outputs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')); };

//         try {
//             eval(code);
//             console.log = originalLog;
//             res.json({ output: outputs.join('\n') || "Program ran successfully." });
//         } catch (evalError) {
//             console.log = originalLog;
//             res.json({ output: `Runtime Error: ${evalError.message}` });
//         }
//     } 
//     else if (language === 'python') {
//         let executableCode = code;

//         // YOUR IDEA: The AI Pre-Execution Formatter
//         try {
//             console.log("🐍 Formatting Python indentation via Qwen...");
//             const formatResponse = await axios.post(LM_STUDIO_URL, {
//                 model: "qwen2.5-coder-7b-instruct",
//                 messages: [
//                     { 
//                         role: "system", 
//                         content: "You are a Python compiler assistant. The user will provide Python code that has lost its indentation. Fix the indentation so it is perfectly valid Python code. Output ONLY the raw Python code. Do not wrap it in markdown formatting like ```python, and do not explain the code." 
//                     },
//                     { role: "user", content: executableCode }
//                 ],
//                 temperature: 0.1
//             });
            
//             executableCode = formatResponse.data.choices[0].message.content.replace(/```python/g, "").replace(/```/g, "").trim();
//         } catch (err) {
//             console.error("❌ Indentation fix failed, attempting to run raw code.");
//         }

//         // Write the newly formatted code to the temporary file
//         fs.writeFileSync('Main.py', executableCode);

//         // Execute it
//         exec('python Main.py', (error, stdout, stderr) => {
//             if (fs.existsSync('Main.py')) fs.unlinkSync('Main.py');
//             if (error) {
//                 return res.json({ output: `Python Error:\n${stderr}` });
//             }
//             res.json({ output: stdout || "Program ran successfully." });
//         });
//     }
// });

// app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));

// For the explanation part 

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 3002;
const LM_STUDIO_URL = 'http://localhost:1234/v1/chat/completions';

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


const IDE_SYSTEM_PROMPT = `You are the core logic generator for a visual-textual programming environment.
Your task is to convert code requests into a strict block-by-block structured workflow.

CRITICAL RULES FOR GRANULARITY & EXECUTION:
1. Break down internal modular logic into separate blocks. Do not lump an entire algorithm into one block.
2. BRACKET MATCHING (CRITICAL): If you open a curly brace '{' for a function, loop, or condition in one block, you MUST create a corresponding block later whose "code" contains the closing brace '}'. Missing closing braces cause fatal execution errors.
3. The code will execute in a headless backend. NEVER use user input pauses like Python's input() or JS prompt().
4. If generating an algorithm, include ONE final block that initializes mock test data (using 'var', not 'let'), calls the function, and prints the result. Do not declare test variables anywhere else.

For any task, output ONLY a raw JSON array of blocks. Do not wrap the JSON in markdown formatting.

Each object in the array must have exactly these keys:
- "id": a string sequence (e.g., "b1", "b2", "b3")
- "step": A short, clear English instruction.
- "code": The precise executable code line(s) for this step. Use proper indentation.
- "type": "start" | "process" | "condition" | "loop" | "end"`;

app.post('/api/generate-blocks', async (req, res) => {
    const { prompt, language } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

    const langRule = language === 'python' 
        ? `Write the code in Python. CRITICAL: You MUST include the leading spaces (indentation) directly inside the 'code' string for nested blocks (e.g., inside functions or loops) so it remains valid when parsed.` 
        : `Write the code in JavaScript for a Node.js environment.`;

    try {
        console.log(`🤖 Prompt: "${prompt}" | Lang: ${language}`);
        const response = await axios.post(LM_STUDIO_URL, {
            model: "qwen2.5-coder-7b-instruct",
            messages: [
                { role: "system", content: `${IDE_SYSTEM_PROMPT}\n\nCRITICAL LANGUAGE RULE: ${langRule}` },
                { role: "user", content: `Generate JSON logic steps for: "${prompt}"` }
            ],
            temperature: 0.1
        });

        let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
        res.json({ blocks: JSON.parse(cleanJson) });
    } catch (err) {
        console.error("❌ LM Studio Error:", err.message);
        res.status(500).json({ error: "Failed to build steps." });
    }
});

// --- NEW FEATURE: EXPLAIN BLOCK ---
app.post('/api/explain-block', async (req, res) => {
    const { code, step, language } = req.body;
    try {
        const explainPrompt = `You are a helpful coding tutor. Explain the following ${language} code snippet in 2 to 3 short, easy-to-understand sentences. Explain what the variables and logic are doing. Do not output JSON, just output the plain text explanation.\n\nStep Context: ${step}\nCode:\n${code}`;
        const response = await axios.post(LM_STUDIO_URL, {
            model: "qwen2.5-coder-7b-instruct",
            messages: [
                { role: "system", content: "You are an expert programming tutor." },
                { role: "user", content: explainPrompt }
            ],
            temperature: 0.3
        });
        res.json({ explanation: response.data.choices[0].message.content.trim() });
    } catch (err) {
        res.status(500).json({ error: "Failed to generate explanation." });
    }
});
// ----------------------------------

app.post('/api/update-block', async (req, res) => {
    const { targetBlockId, updatedStepText, fullBlockContext, language } = req.body;
    try {
        const updatePrompt = `Update a single step inside this context:\n${JSON.stringify(fullBlockContext)}\n\nModify the block where "id" is "${targetBlockId}". Change "step" to: "${updatedStepText}". Regenerate its "code" to match this new description perfectly in ${language}. Output the full updated JSON array ONLY.`;

        const response = await axios.post(LM_STUDIO_URL, {
            model: "qwen2.5-coder-7b-instruct",
            messages: [
                { role: "system", content: IDE_SYSTEM_PROMPT },
                { role: "user", content: updatePrompt }
            ],
            temperature: 0.1
        });

        let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
        res.json({ blocks: JSON.parse(cleanJson) });
    } catch (err) {
        res.status(500).json({ error: "Failed to recalculate step." });
    }
});

app.post('/api/update-from-code', async (req, res) => {
    const { targetBlockId, updatedCode, fullBlockContext } = req.body;
    try {
        const updatePrompt = `Update a single step's English description inside this context based on its new code:
${JSON.stringify(fullBlockContext)}

The user manually changed the "code" for block "${targetBlockId}" to:
${updatedCode}

Analyze the new code. Update the "step" text to accurately describe what the new code does. Keep the "code" exactly as the user wrote it. Output ONLY the full updated JSON array.`;

        const response = await axios.post(LM_STUDIO_URL, {
            model: "qwen2.5-coder-7b-instruct",
            messages: [
                { role: "system", content: IDE_SYSTEM_PROMPT },
                { role: "user", content: updatePrompt }
            ],
            temperature: 0.1
        });

        let cleanJson = response.data.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
        res.json({ blocks: JSON.parse(cleanJson) });
    } catch (err) {
        res.status(500).json({ error: "Failed to recalculate English step from code." });
    }
});

// MULTI-LANGUAGE EXECUTION ENGINE
app.post('/api/run-code', async (req, res) => { 
    const { code, language } = req.body;

    if (language === 'javascript') {
        let outputs = [];
        const originalLog = console.log;
        console.log = (...args) => { outputs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')); };

        try {
            eval(code);
            console.log = originalLog;
            res.json({ output: outputs.join('\n') || "Program ran successfully." });
        } catch (evalError) {
            console.log = originalLog;
            res.json({ output: `Runtime Error: ${evalError.message}` });
        }
    } 
    else if (language === 'python') {
        let executableCode = code;

        // YOUR IDEA: The AI Pre-Execution Formatter
        try {
            console.log("🐍 Formatting Python indentation via Qwen...");
            const formatResponse = await axios.post(LM_STUDIO_URL, {
                model: "qwen2.5-coder-7b-instruct",
                messages: [
                    { 
                        role: "system", 
                        content: "You are a Python compiler assistant. The user will provide Python code that has lost its indentation. Fix the indentation so it is perfectly valid Python code. Output ONLY the raw Python code. Do not wrap it in markdown formatting like ```python, and do not explain the code." 
                    },
                    { role: "user", content: executableCode }
                ],
                temperature: 0.1
            });
            
            executableCode = formatResponse.data.choices[0].message.content.replace(/```python/g, "").replace(/```/g, "").trim();
        } catch (err) {
            console.error("❌ Indentation fix failed, attempting to run raw code.");
        }

        // Write the newly formatted code to the temporary file
        fs.writeFileSync('Main.py', executableCode);

        // Execute it
        exec('python Main.py', (error, stdout, stderr) => {
            if (fs.existsSync('Main.py')) fs.unlinkSync('Main.py');
            if (error) {
                return res.json({ output: `Python Error:\n${stderr}` });
            }
            res.json({ output: stdout || "Program ran successfully." });
        });
    }
});

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));