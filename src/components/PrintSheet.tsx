import React from 'react';
import { VocabItem, TranslationMode, TestContent } from '../types';

interface PrintSheetProps {
  data: VocabItem[];
  mode: TranslationMode;
  content: TestContent;
  dayNumber?: number;
  totalDays?: number;
}

export function PrintSheet({ data, mode, content, dayNumber, totalDays }: PrintSheetProps) {
  const showWords = content === 'words' || content === 'both';
  const showSentences = content === 'sentences' || content === 'both';

  return (
    <div className="bg-white mx-auto print:mx-0 max-w-[210mm] w-full min-h-[297mm] p-10 md:p-[15mm] shadow-2xl print:shadow-none print:max-w-full print:p-0 flex flex-col box-border origin-top print:break-after-page">
      
      {/* Header section */}
      <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-6 print:mb-5">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">Vocab Dictation List</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
            Mode: {mode === 'en2zh' ? 'EN to CN' : 'CN to EN'} 
            {totalDays && totalDays > 1 ? ` / Day: ${dayNumber} of ${totalDays}` : ''}
            {' '}/ Date: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <div className="w-32 h-6 border-b border-slate-300 mb-1"></div>
          <p className="text-[9px] text-slate-400 uppercase tracking-widest">Score / Name</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 print:grid-cols-2 mb-8 print:mb-6">
        {data.map((item, i) => {
          const renderWord = showWords;
          const renderSentence = showSentences && (item.engSentence || item.chnSentence);

          return (
            <div key={`item-${item.id}`} className="border-b border-slate-100 pb-3 break-inside-avoid">
              {renderWord && (
                <div className="mb-2">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-bold font-serif text-slate-900">
                      {i + 1}. {mode === 'en2zh' ? item.english : item.chinese}
                    </span>
                    {mode === 'en2zh' && item.type && (
                      <span className="text-[8px] italic text-slate-400 px-1 border border-slate-200 rounded ml-2 shrink-0">
                        {item.type}
                      </span>
                    )}
                  </div>
                  <div className="h-5 border-b border-dashed border-slate-300 w-full"></div>
                </div>
              )}

              {renderSentence && (
                <div className={renderWord ? "mt-3" : ""}>
                  {!renderWord && <span className="text-xs font-bold font-serif text-slate-900 mr-1">{i + 1}.</span>}
                  <span className="text-[10.5px] text-slate-800 leading-relaxed font-serif font-medium">
                    {mode === 'en2zh' ? item.engSentence : item.chnSentence}
                  </span>
                  <div className="h-6 border-b border-dashed border-slate-300 w-full mt-1"></div>
                  {!renderWord && <div className="h-6 border-b border-dashed border-slate-300 w-full mt-2"></div>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.length === 0 && (
        <div className="text-slate-400 text-center py-20 italic text-sm">
          No content available for this day.
        </div>
      )}

      {/* Paper Footer Indicator */}
      <div className="mt-auto flex justify-between items-center text-[8px] text-slate-400 border-t border-slate-100 pt-3 print:hidden">
        <span>Printed via VocabPrint Pro</span>
        <span>A4 Format Default</span>
      </div>
    </div>
  );
}
