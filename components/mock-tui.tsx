'use client';

import { useState } from 'react';

type Risk = 'safe' | 'review' | 'protected';

interface Candidate {
  path: string;
  size: string;
  risk: Risk;
  type: string;
  age: string;
  reason: string;
}

const CANDIDATES: Candidate[] = [
  { path: '/Users/aaron/Library/Caches', size: '5.6 GiB', risk: 'safe', type: 'cache', age: '0d', reason: '可再生的应用/包缓存' },
  { path: '/Users/aaron/.cc-switch/backups', size: '15.5 GiB', risk: 'review', type: 'backup', age: '8d', reason: '备份数据，需确认保留策略' },
  { path: '/Users/aaron/Documents/Neurasea Grid/target', size: '20.2 GiB', risk: 'protected', type: 'project', age: '12d', reason: '用户文档/项目，禁止自动清理' },
  { path: '/Users/aaron/.cache', size: '2.3 GiB', risk: 'safe', type: 'cache', age: '8d', reason: '可再生的应用/包缓存' },
  { path: '/Users/aaron/.kimi_openclaw/logs', size: '1.4 GiB', risk: 'safe', type: 'log', age: '8d', reason: '旧日志数据' },
  { path: '/Users/aaron/Documents/orca-quant/node_modules', size: '2.4 GiB', risk: 'protected', type: 'project', age: '15d', reason: '用户文档/项目，禁止自动清理' },
];

const MOCK_ANALYSIS = `## 结论

磁盘总容量约 471 GiB，已用 388 GiB，可用仅 81 GiB（约 17%）。主要占用集中在缓存、日志、构建产物与备份数据。可安全回收约 11 GiB，另有 15.5 GiB 备份需人工确认。

## 安全优化建议

以下 safe 项可移入废纸篓（需输入确认后执行）：缓存/日志类合计约 9.3 GiB。

## 需要人工确认

- .cc-switch 备份（review）
- Documents 项目（protected，需管理员验证）`;

const RISK_COLOR: Record<Risk, string> = {
  safe: 'text-emerald-400',
  review: 'text-amber-400',
  protected: 'text-rose-400',
};

export default function MockTUI() {
  const [tab, setTab] = useState<'agent' | 'optimize'>('agent');
  const [plan, setPlan] = useState<Set<string>>(new Set());
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  const toggle = (path: string) => {
    setPlan((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const generate = () => {
    setTyping(true);
    setAnalysis('');
    let i = 0;
    const text = MOCK_ANALYSIS;
    const timer = setInterval(() => {
      i += 3;
      setAnalysis(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setTyping(false);
      }
    }, 16);
  };

  const planSize = CANDIDATES.filter((c) => plan.has(c.path)).reduce(
    (sum, c) => sum + parseFloat(c.size),
    0,
  );

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
      {/* 终端标题栏 */}
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-500" />
        <span className="size-3 rounded-full bg-green-500" />
        <span className="ml-3 font-mono text-xs text-zinc-400">
          storage-agent — 优化流程 ① AI 解释并排序 → ② 分级选择清理项 → ③ 移入废纸篓
        </span>
      </div>

      {/* Tab 栏 */}
      <div className="flex gap-1 border-b border-zinc-800 bg-zinc-900/60 px-3 py-2 font-mono text-xs">
        {(['agent', 'optimize'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded px-2.5 py-1 transition ${
              tab === t
                ? 'bg-emerald-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {t === 'agent' ? '1 AI 优化建议' : '2 选择清理项'}
          </button>
        ))}
      </div>

      <div className="min-h-[340px] p-4 font-mono text-sm">
        {tab === 'agent' ? (
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <button
                onClick={generate}
                disabled={typing}
                className="rounded bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
              >
                ① 生成建议{typing ? '…' : ''}
              </button>
              <button
                onClick={() => setTab('optimize')}
                className="rounded border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-zinc-800"
              >
                → ② 选择清理项
              </button>
            </div>
            {analysis ? (
              <pre className="whitespace-pre-wrap text-emerald-300/90">{analysis}</pre>
            ) : (
              <p className="text-zinc-500">
                点击「① 生成建议」，AI 会用只读方式解释磁盘占用并排序候选（演示为模拟数据）。
              </p>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-3 grid grid-cols-[2.5rem_5rem_4.5rem_3.5rem_1fr_1.5fr] gap-2 border-b border-zinc-800 pb-2 text-xs text-zinc-500">
              <span>Plan</span>
              <span>Size</span>
              <span>Risk</span>
              <span>Type</span>
              <span>Path</span>
              <span>Reason</span>
            </div>
            <div className="space-y-1">
              {CANDIDATES.map((c) => {
                const selected = plan.has(c.path);
                return (
                  <button
                    key={c.path}
                    onClick={() => toggle(c.path)}
                    className={`grid w-full grid-cols-[2.5rem_5rem_4.5rem_3.5rem_1fr_1.5fr] items-center gap-2 rounded px-1 py-1 text-left transition ${
                      selected ? 'bg-emerald-900/40' : 'hover:bg-zinc-900'
                    }`}
                  >
                    <span className={selected ? 'text-emerald-400' : 'text-zinc-600'}>
                      {selected ? '✓' : '·'}
                    </span>
                    <span className="text-zinc-200">{c.size}</span>
                    <span className={RISK_COLOR[c.risk]}>{c.risk}</span>
                    <span className="text-zinc-400">{c.type}</span>
                    <span className="truncate text-zinc-300">{c.path}</span>
                    <span className="truncate text-zinc-500">{c.reason}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded border border-emerald-800 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-300">
              清理清单：{plan.size} 项 · 约 {planSize.toFixed(1)} GiB · safe 普通确认 · review 强化确认 · protected 管理员验证
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
