export interface VocabItem {
  id: string;
  english: string;
  type: string;
  chinese: string;
  engSentence: string;
  chnSentence: string;
}

export type TranslationMode = 'en2zh' | 'zh2en';
export type TestContent = 'words' | 'sentences' | 'both';
