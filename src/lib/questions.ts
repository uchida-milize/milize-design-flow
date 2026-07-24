export type AnswerOption = {
  id: string;
  label: string;
  subLabel?: string;
  score: number;
};

export type Question = {
  id: number;
  category: string;
  qLabel: string;
  title: string;
  subtitle?: string;
  type: 'radio' | 'textarea';
  options?: AnswerOption[];
  placeholder?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'もしもシリーズ（現実チェック）',
    qLabel: 'Q1',
    title: '開業初月、患者さんが想定の半分しか来ませんでした。あなたは最初に何をしますか？',
    type: 'radio',
    options: [
      { id: 'a', label: 'SNSや広告を強化', score: 3 },
      { id: 'b', label: '診療時間や内容を見直す', score: 4 },
      { id: 'c', label: '立地や競合を再分析', score: 4 },
      { id: 'd', label: 'とりあえず様子見', score: 1 },
    ],
  },
  {
    id: 2,
    category: '直感で選ぶ「強み」',
    qLabel: 'Q2',
    title: 'あなたのクリニック、どれで勝負しますか？',
    type: 'radio',
    options: [
      { id: 'a', label: '技術（腕に自信）', score: 4 },
      { id: 'b', label: '立地（人が来る場所）', score: 3 },
      { id: 'c', label: '人柄（通いたくなる）', score: 4 },
      { id: 'd', label: '仕組み（効率・IT）', score: 3 },
    ],
  },
  {
    id: 3,
    category: '投資に対する感覚',
    qLabel: 'Q3',
    title: '内装・医療機器に予算オーバーしそうです。あなたの気持ちに一番近いのは？',
    type: 'radio',
    options: [
      { id: 'a', label: '「ここでケチると後悔する」', score: 4 },
      { id: 'b', label: '「回収できるかが不安」', score: 3 },
      { id: 'c', label: '「最低限でいい」', score: 2 },
      { id: 'd', label: '「むしろもっと投資したい」', score: 3 },
    ],
  },
  {
    id: 4,
    category: '競合の見え方',
    qLabel: 'Q4',
    title: '近くに人気クリニックができました。あなたの第一印象は？',
    type: 'radio',
    options: [
      { id: 'a', label: 'ヤバイ…', score: 1 },
      { id: 'b', label: '学べるチャンス', score: 4 },
      { id: 'c', label: '差別化しやすい', score: 4 },
      { id: 'd', label: '特に気にしない', score: 2 },
    ],
  },
  {
    id: 5,
    category: '家族とのリアル',
    qLabel: 'Q5',
    title: '開業が思ったより大変そうなとき、家族にどう言いますか？',
    type: 'radio',
    options: [
      { id: 'a', label: '「ちょっと厳しいかも」', score: 3 },
      { id: 'b', label: '「大丈夫、なんとかする」', score: 4 },
      { id: 'c', label: '「まだ想定内」', score: 4 },
      { id: 'd', label: 'あまり話さない', score: 2 },
    ],
  },
  {
    id: 6,
    category: 'データ vs 感覚',
    qLabel: 'Q6',
    title: '開業地を決めるとき、どっち派？',
    type: 'radio',
    options: [
      { id: 'a', label: 'データ重視（人口・競合・動態）', score: 4 },
      { id: 'b', label: '直感重視（なんとなく良さそう）', score: 2 },
      { id: 'c', label: '両方バランス', score: 4 },
      { id: 'd', label: '人に勧められて', score: 1 },
    ],
  },
  {
    id: 7,
    category: 'スタッフ観',
    qLabel: 'Q7',
    title: '理想のスタッフは？',
    type: 'radio',
    options: [
      { id: 'a', label: '経験豊富で即戦力', score: 3 },
      { id: 'b', label: '若くて伸びしろ重視', score: 3 },
      { id: 'c', label: '人柄が良ければOK', score: 4 },
      { id: 'd', label: '最小人数で回したい', score: 2 },
    ],
  },
  {
    id: 8,
    category: 'ストレス時の行動',
    qLabel: 'Q8',
    title: '忙しさと経営で疲れたとき、あなたは？',
    type: 'radio',
    options: [
      { id: 'a', label: '数字を見直す', score: 4 },
      { id: 'b', label: '誰かに相談する', score: 4 },
      { id: 'c', label: 'とりあえず寝る', score: 3 },
      { id: 'd', label: '気合いで乗り切る', score: 2 },
    ],
  },
  {
    id: 9,
    category: '患者との距離感',
    qLabel: 'Q9',
    title: '患者さんとの関係、理想は？',
    type: 'radio',
    options: [
      { id: 'a', label: '信頼されるプロ', score: 4 },
      { id: 'b', label: '相談しやすい存在', score: 4 },
      { id: 'c', label: '距離を保つ専門家', score: 3 },
      { id: 'd', label: '地域の顔なじみ', score: 4 },
    ],
  },
  {
    id: 10,
    category: '最悪シナリオの捉え方',
    qLabel: 'Q10',
    title: '1年後、経営がうまくいかなかった場合、一番近い気持ちは？',
    type: 'radio',
    options: [
      { id: 'a', label: '改善すればいける', score: 4 },
      { id: 'b', label: '原因を徹底分析', score: 4 },
      { id: 'c', label: '別の道も考える', score: 3 },
      { id: 'd', label: 'そもそも想定している', score: 4 },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export type DiagnosisAnswers = {
  [questionId: number]: string;
};

export function calculateScore(answers: DiagnosisAnswers): number {
  let total = 0;
  let maxPossible = 0;
  QUESTIONS.forEach((q) => {
    if (q.type === 'textarea') return;
    maxPossible += 5;
    const answerId = answers[q.id];
    if (answerId && q.options) {
      const opt = q.options.find((o) => o.id === answerId);
      if (opt) total += opt.score;
    }
  });
  return Math.round((total / maxPossible) * 100);
}

export function getScoreTier(score: number): 'high' | 'medium' | 'low' {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

export type CategoryKey = '資金力' | '経営設計力' | '競合状況' | '市場性' | '人脈・ネットワーク';

const CATEGORY_QUESTION_MAP: Record<CategoryKey, number[]> = {
  '資金力': [3, 10],
  '経営設計力': [1, 8],
  '競合状況': [4, 6],
  '市場性': [2, 5],
  '人脈・ネットワーク': [7, 9],
};

const CATEGORY_TIPS: Record<CategoryKey, string> = {
  '資金力': '資金計画の専門家への早期相談で改善可能です！',
  '経営設計力': '事業計画書の見直しやセミナー受講で改善可能です！',
  '競合状況': '医師会や勉強会への参加で改善可能です！',
  '市場性': 'エリアのニーズ調査と差別化戦略の検討で改善可能です！',
  '人脈・ネットワーク': '医師会や勉強会への参加で改善可能です！',
};

export function calculateCategoryScores(answers: DiagnosisAnswers): Record<CategoryKey, number> {
  const result = {} as Record<CategoryKey, number>;
  (Object.keys(CATEGORY_QUESTION_MAP) as CategoryKey[]).forEach((category) => {
    const qIds = CATEGORY_QUESTION_MAP[category];
    let total = 0;
    qIds.forEach((qId) => {
      const q = QUESTIONS.find((item) => item.id === qId);
      const answerId = answers[qId];
      const opt = q?.options?.find((o) => o.id === answerId);
      total += opt ? opt.score : 2.5;
    });
    result[category] = Math.round((total / (qIds.length * 4)) * 100);
  });
  return result;
}

export function getWeakestCategories(scores: Record<CategoryKey, number>, count = 2): CategoryKey[] {
  return (Object.keys(scores) as CategoryKey[])
    .sort((a, b) => scores[a] - scores[b])
    .slice(0, count);
}

export function getCategoryTip(category: CategoryKey): string {
  return CATEGORY_TIPS[category];
}

export const SCORE_MESSAGES = {
  high: {
    badge: '開業適性が高いです',
    description: 'あなたのスコアは全体の上位30%です。立地選択と資金計画の最適化で成功確率がさらに向上します。',
  },
  medium: {
    badge: '着実に準備を進めましょう',
    description: '開業に向けた基礎はできています。いくつかの課題を整理することで、成功確率を大きく高められます。',
  },
  low: {
    badge: 'まず基盤を固めましょう',
    description: '開業の夢を実現するために、今から準備を始めることが重要です。専門家のサポートが力になります。',
  },
};
