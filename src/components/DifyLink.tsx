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
      <svg height="20" viewBox="0 0 108 40" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0" y="31"
          fontFamily="'Arial Black', Arial, Helvetica, sans-serif" fontWeight={900} fontSize={36}
        >
          <tspan fill="#111111">D</tspan>
          <tspan fill="#1447E6">if</tspan>
          <tspan fill="#111111">y</tspan>
        </text>
      </svg>
    </a>
  );
}
