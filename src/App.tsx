import React, { useState } from 'react';
import { Download, Upload, Settings2 } from 'lucide-react';
import { VocabItem, TranslationMode, TestContent } from './types';
import { DEFAULT_RAW_DATA, parseRawData } from './defaultData';
import { ImportModal } from './components/ImportModal';
import { PrintSheet } from './components/PrintSheet';

function App() {
  const [data, setData] = useState<VocabItem[]>(parseRawData(DEFAULT_RAW_DATA));
  const [mode, setMode] = useState<TranslationMode>('en2zh');
  const [content, setContent] = useState<TestContent>('both'); // Defaulting to 'both' to show full worksheet
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [days, setDays] = useState<number>(1);
  const [marginOption, setMarginOption] = useState<'small' | 'normal' | 'large'>('normal');

  const handleImport = (text: string) => {
    try {
      const parsed = parseRawData(text);
      if (parsed.length > 0) {
        setData(parsed);
      } else {
        alert("No valid data found to import. Please check your format.");
      }
    } catch (e) {
      alert("An error occurred while parsing the data.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Chunking logic for splitting data across days
  const actualDays = Math.min(days, Math.max(1, data.length));
  
  const dailyChunks: { day: number; items: VocabItem[] }[] = [];
  
  if (data.length > 0) {
    const baseSize = Math.floor(data.length / actualDays);
    let remainder = data.length % actualDays;
    let dataIndex = 0;
    
    for (let i = 0; i < actualDays; i++) {
      const size = baseSize + (remainder > 0 ? 1 : 0);
      remainder--;
      
      const dayData = data.slice(dataIndex, dataIndex + size);
      dataIndex += size;
      
      dailyChunks.push({
        day: i + 1,
        items: dayData
      });
    }
  } else {
    dailyChunks.push({ day: 1, items: [] });
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans print:bg-white text-slate-900 flex flex-col">
      
      {/* Top Controls Bar (Hidden while printing) */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm print:hidden shrink-0">
        <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 w-full xl:max-w-7xl">
          
          <div className="flex items-center gap-3 text-slate-800 shrink-0">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
              <Settings2 size={24} />
            </div>
            <h1 className="font-bold text-xl tracking-tight hidden sm:block">VocabPrint <span className="text-blue-600">Pro</span></h1>
          </div>

          {/* Central Settings */}
          <div className="flex items-center gap-4 text-sm font-medium bg-slate-100 p-1.5 rounded-lg border border-slate-200 overflow-x-auto w-full lg:w-auto shadow-inner">
            
            {/* Mode Switcher */}
            <div className="flex items-center bg-transparent rounded p-0 shrink-0 gap-1">
              <button
                className={`px-4 py-1.5 text-xs font-bold rounded transition-all duration-200 ${mode === 'en2zh' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setMode('en2zh')}
              >
                EN → CN
              </button>
              <button
                className={`px-4 py-1.5 text-xs font-bold rounded transition-all duration-200 ${mode === 'zh2en' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setMode('zh2en')}
              >
                CN → EN
              </button>
            </div>

            <div className="w-px h-5 bg-slate-300 hidden md:block shrink-0"></div>

            {/* Test Content Type Selector */}
            <select 
              value={content} 
              onChange={(e) => setContent(e.target.value as TestContent)}
              className="bg-white border text-xs font-bold text-slate-700 border-slate-200 rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm hover:border-slate-300 transition-colors shrink-0 outline-none"
            >
              <option value="words">Words Only</option>
              <option value="sentences">Sentences Only</option>
              <option value="both">Full Test</option>
            </select>

            <div className="w-px h-5 bg-slate-300 hidden md:block shrink-0"></div>

            {/* Days Input */}
            <div className="flex items-center gap-2 bg-transparent shrink-0 px-2">
              <span className="text-xs font-bold text-slate-600">Days:</span>
              <input 
                type="number" 
                min="1" 
                value={days}
                onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 bg-white border text-xs font-bold text-slate-700 border-slate-200 rounded px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
              />
            </div>

            <div className="w-px h-5 bg-slate-300 hidden md:block shrink-0"></div>

            {/* Margin Selector */}
            <select 
              value={marginOption} 
              onChange={(e) => setMarginOption(e.target.value as 'small' | 'normal' | 'large')}
              className="bg-white border text-xs font-bold text-slate-700 border-slate-200 rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm hover:border-slate-300 transition-colors shrink-0 outline-none"
            >
              <option value="small">Margin: Small</option>
              <option value="normal">Margin: Normal</option>
              <option value="large">Margin: Large</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 ml-auto lg:ml-0">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
            >
              <Upload size={16} />
              <span className="hidden sm:inline">Import</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download size={16} />
              <span>Export PDF (A4)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 bg-slate-500 py-8 px-4 sm:px-8 flex flex-col items-center gap-8 print:p-0 print:bg-white print:gap-0">
        {dailyChunks.map((chunk, index) => (
          <PrintSheet 
            key={index} 
            data={chunk.items} 
            mode={mode} 
            content={content} 
            dayNumber={chunk.day}
            totalDays={actualDays}
            startIndex={0}
            marginOption={marginOption}
            isFirst={index === 0}
          />
        ))}
      </div>

      {/* Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}

export default App;
