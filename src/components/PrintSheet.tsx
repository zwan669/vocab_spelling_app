import React from 'react';
import { VocabItem, TranslationMode, TestContent } from '../types';

export interface PrintSheetProps {
  key?: React.Key;
  data: VocabItem[];
  mode: TranslationMode;
  content: TestContent;
  dayNumber?: number;
  totalDays?: number;
  pageIndex?: number;
  totalPages?: number;
  startIndex?: number;
  marginOption?: 'small' | 'normal' | 'large';
}

export function PrintSheet({ 
  data, 
  mode, 
  content, 
  dayNumber, 
  totalDays, 
  pageIndex, 
  totalPages, 
  startIndex = 0,
  marginOption = 'normal'
}: PrintSheetProps) {
  const showWords = content === 'words' || content === 'both';
  const showSentences = content === 'sentences' || content === 'both';

  const marginClasses = {
    small: 'md:p-[8mm]',
    normal: 'md:p-[12mm]',
    large: 'md:p-[20mm]'
  };

  return (
    <div className={`bg-white mx-auto w-full max-w-[210mm] min-h-[297mm] p-6 sm:p-10 ${marginClasses[marginOption]} shadow-2xl print:shadow-none print:max-w-none print:p-0 flex flex-col box-border origin-top print:break-after-page relative`}>
      <style>{`
        @media print {
          .print\\\\:p-0 {
             padding: ${marginOption === 'small' ? '8mm' : marginOption === 'large' ? '20mm' : '12mm'} !important;
          }
        }
      `}</style>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 print:grid-cols-2 mb-8 print:mb-6 mt-2">
        {data.map((item, i) => {
          const renderWord = showWords;
          const renderSentence = showSentences && (item.engSentence || item.chnSentence);

          return (
            <div key={`item-${item.id}`} className="border-b border-slate-100 pb-3 break-inside-avoid">
              {renderWord && (
                <div className="mb-2">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[13px] font-bold font-serif text-slate-900 break-words flex-1 min-w-0 pr-2">
                      {startIndex + i + 1}. {mode === 'en2zh' ? item.english : item.chinese}
                    </span>
                    {mode === 'en2zh' && item.type && (
                      <span className="text-[9px] italic text-slate-400 px-1 border border-slate-200 rounded ml-2 shrink-0 relative top-[-1px]">
                        {item.type}
                      </span>
                    )}
                  </div>
                  <div className="h-5 border-b border-dashed border-slate-300 w-full"></div>
                </div>
              )}

              {renderSentence && (
                <div className={renderWord ? "mt-3" : ""}>
                  {!renderWord && <span className="text-[13px] font-bold font-serif text-slate-900 mr-1">{startIndex + i + 1}.</span>}
                  <span className="text-[10.5px] text-slate-800 leading-relaxed font-serif font-medium break-words">
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

      </div>
  );
}
