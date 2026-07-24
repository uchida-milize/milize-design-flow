'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { PhoneShell } from '@/components/PhoneShell';
import { useApp } from '@/lib/store';
import { QUESTIONS, TOTAL_QUESTIONS } from '@/lib/questions';

export default function QuestionsPage() {
  const router = useRouter();
  const params = useParams<{ q: string }>();
  const { answers, setAnswer, computeScore } = useApp();
  const [animKey, setAnimKey] = useState(0);
  const [textAnswer, setTextAnswer] = useState('');

  const currentQuestion = Math.min(Math.max(Number(params.q) || 1, 1), TOTAL_QUESTIONS);
  const q = QUESTIONS[currentQuestion - 1];
  const progress = (currentQuestion / TOTAL_QUESTIONS) * 100;
  const selectedAnswer = answers[q.id];
  const canProceed = q.type === 'textarea' ? textAnswer.length > 0 : !!selectedAnswer;

  useEffect(() => {
    setAnimKey((k) => k + 1);
    if (q.type === 'textarea') setTextAnswer(answers[q.id] || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const handleSelect = (optionId: string) => {
    setAnswer(q.id, optionId);
  };

  const handleNext = () => {
    if (q.type === 'textarea') setAnswer(q.id, textAnswer);
    if (currentQuestion < TOTAL_QUESTIONS) {
      router.push(`/prototype/questions/${currentQuestion + 1}`);
    } else {
      computeScore();
      router.push('/prototype/loading');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) router.push(`/prototype/questions/${currentQuestion - 1}`);
    else router.push('/prototype');
  };

  return (
    <PhoneShell>
      <div className="relative w-full min-h-[844px] flex flex-col overflow-hidden" style={{ background: '#091946' }}>

        {/* Content sheet */}
        <div className="relative flex-1 flex flex-col"
          style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f4f8ff 55%, #dbeafe 100%)', borderRadius: '20px 20px 0 0' }}>

          {/* Mascot */}
          <div className="absolute right-4 z-10" style={{ top: 36 }}>
            <Image src="/mascot-1.png" alt="" width={135} height={135} style={{ transform: 'scaleX(-1)' }} />
          </div>

          {/* Top nav */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
            <button onClick={handleBack} className="flex items-center gap-1 text-sm font-medium"
              style={{ color: '#2563eb' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              戻る
            </button>
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold" style={{ color: '#4b5563' }}>
                質問 {currentQuestion} / {TOTAL_QUESTIONS}
              </span>
              <div className="progress-bar mt-1" style={{ width: 96 }}>
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="w-8" />
          </div>

          {/* Question */}
          <div className="flex-1 px-6 pt-4 pb-5 flex flex-col overflow-y-auto" key={animKey}>
            <div className="flex justify-center animate-fade-in" style={{ marginTop: 32, marginBottom: 32 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/questions/q${currentQuestion}.svg`} alt={`Q${currentQuestion}`} style={{ height: 34, width: 'auto' }} />
            </div>
            <p className="text-lg font-bold leading-snug text-center animate-fade-in" style={{ color: '#111827', marginBottom: 16 }}>
              {q.title.split('。').filter(Boolean).map((sentence, i, arr) => (
                <span key={i}>
                  {sentence}{i < arr.length - 1 && '。'}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
            {q.subtitle && (
              <p className="text-xs mb-6 animate-fade-in" style={{ color: '#6b7280' }}>{q.subtitle}</p>
            )}

            <div className="flex flex-col gap-3">
              {q.type === 'radio' && q.options?.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`option-card ${selectedAnswer === opt.id ? 'selected' : ''}`}>
                  <div>
                    <span className="text-sm font-medium" style={{ color: '#111827' }}>{opt.label}</span>
                    {opt.subLabel && (
                      <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{opt.subLabel}</p>
                    )}
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: selectedAnswer === opt.id ? '#2563eb' : '#bfdbfe',
                      background: selectedAnswer === opt.id ? '#2563eb' : 'transparent',
                    }}>
                    {selectedAnswer === opt.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              ))}

              {q.type === 'textarea' && (
                <textarea
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder={q.placeholder}
                  rows={6}
                  className="w-full p-4 rounded-xl text-sm resize-none border-2 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    borderColor: textAnswer ? '#2563eb' : 'rgba(191,219,254,0.5)',
                    color: '#111827',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              )}
            </div>
          </div>

          {/* Next button */}
          <div className="px-6 pb-6 pt-2 flex-shrink-0">
            <button onClick={handleNext} disabled={!canProceed} className="btn-primary mx-auto" style={{ width: 298 }}>
              {currentQuestion === TOTAL_QUESTIONS ? '診断結果を確認する →' : '次へ →'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="py-3 text-center flex-shrink-0" style={{ background: '#deeafc' }}>
          <p className="text-xs" style={{ color: '#6b7280' }}>© SHARP FINANCE CORPORATION</p>
        </div>
      </div>
    </PhoneShell>
  );
}
