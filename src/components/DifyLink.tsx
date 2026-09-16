const DIFY_WORKFLOW_URL = 'https://console.dify.milize.com/app/f8b750f3-aad2-411f-9ebe-e4da939bf816/workflow';

/** ヘッダー右側に表示する、Difyワークフロー編集画面への導線アイコン */
export function DifyLink() {
  return (
    <a
      href={DIFY_WORKFLOW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Dify ワークフローを開く"
      title="Dify ワークフローを開く"
      style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#1C64F2" />
        <text
          x="12" y="17" textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif" fontWeight={700} fontSize={13}
          fill="#ffffff"
        >
          D
        </text>
      </svg>
    </a>
  );
}
