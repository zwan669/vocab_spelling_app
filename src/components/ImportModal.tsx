import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ImportModalProps {
  onClose: () => void;
  onImport: (text: string) => void;
  isOpen: boolean;
}

export function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50 print:hidden">
      <div className="bg-white rounded-xl w-full max-w-3xl flex flex-col h-[80vh] shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Import Data</h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 p-5 lg:p-6 overflow-hidden flex flex-col bg-white">
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Please paste your vocabulary list. Format (separated by |):
            <br />
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 text-xs font-mono">English Word | Type | Chinese Meaning | English Sentence | Chinese Sentence</code>
          </p>
          <textarea
            className="flex-1 w-full border border-slate-200 rounded-lg p-3 font-mono text-xs bg-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"be born with | 固搭 | 生来具有 | Everyone is born with the ability to learn. | 每个人生来都拥有学习的能力。\nget through sth | 固搭 | 渡过（难关） | We can... | 我们..."}
          />
        </div>
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => {
              if (text.trim()) {
                onImport(text);
                setText('');
                onClose();
              }
            }}
            className="px-6 py-2 text-xs font-bold text-white bg-blue-600 border border-transparent rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
