import { LessonSummary, VocabItem, KanjiItem, GrammarRule, DialogueLine, ExerciseQuestion } from '../types';

export interface FullLessonData {
  summary: LessonSummary;
  vocabulary: VocabItem[];
  kanji: KanjiItem[];
  grammarRules: GrammarRule[];
  dialogue: DialogueLine[];
  reading: {
    titleJp: string;
    titleBn: string;
    contentJp: string;
    contentBn: string;
    vocabularyKeys: string[];
  };
  exercises: ExerciseQuestion[];
}
