'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { DiagnosisAnswers, calculateScore, getScoreTier } from './questions';

type AppState = {
  answers: DiagnosisAnswers;
  score: number | null;
  scoreTier: 'high' | 'medium' | 'low' | null;
  resultsRevealed: boolean;
  setAnswer: (qId: number, answerId: string) => void;
  computeScore: () => void;
  setResultsRevealed: (v: boolean) => void;
  reset: () => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<DiagnosisAnswers>({});
  const [score, setScore] = useState<number | null>(null);
  const [scoreTier, setScoreTier] = useState<'high' | 'medium' | 'low' | null>(null);
  const [resultsRevealed, setResultsRevealed] = useState(false);

  const setAnswer = (qId: number, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: answerId }));
  };

  const computeScore = () => {
    const s = calculateScore(answers);
    setScore(s);
    setScoreTier(getScoreTier(s));
    setResultsRevealed(false);
  };

  const reset = () => {
    setAnswers({});
    setScore(null);
    setScoreTier(null);
    setResultsRevealed(false);
  };

  return (
    <AppContext.Provider value={{ answers, score, scoreTier, resultsRevealed, setAnswer, computeScore, setResultsRevealed, reset }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
