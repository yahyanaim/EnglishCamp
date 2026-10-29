const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const Module = require('node:module');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...args) {
  if (request.startsWith('@/')) request = path.join(__dirname, '../src', request.slice(2));
  return originalResolve.call(this, request, parent, ...args);
};
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
};

// Isolated in-memory browser storage; tests never access a person's browser profile.
const values = new Map();
Object.defineProperty(global, 'localStorage', { configurable: true, value: { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key), clear: () => values.clear() } });
