import Link from 'next/link';
import { Cards, Card } from 'fumadocs-ui/components/card';
import MockTUI from '@/components/mock-tui';

const GITHUB = 'https://github.com/Airine/storage-optimizer';
const PYPI = 'https://pypi.org/project/storage-agent-tui/';
const TAP = 'https://github.com/Airine/homebrew-storage-agent';

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-sm text-zinc-100 dark:border-zinc-800">
      <code>{code}</code>
    </pre>
  );
}

function ExternalButton({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
        variant === 'primary'
          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
          : 'border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
      }`}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* 顶部导航 */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 font-semibold">
          <span className="grid size-7 place-items-center rounded-lg bg-emerald-600 text-sm text-white">
            🗂
          </span>
          Storage Agent
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="/docs" className="hover:text-emerald-600">
            文档
          </Link>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-emerald-600">
            GitHub
          </a>
          <a href={PYPI} target="_blank" rel="noreferrer" className="hover:text-emerald-600">
            PyPI
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <p className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          macOS · Textual · Pi AI 助手 · 开源
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          安全、可解释的存储优化终端工具
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          AI 帮你解释并排序空间占用，你决定清理什么。所有操作移入废纸篓，
          可随时恢复——从第一步到最后一步都清晰可见。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ExternalButton href={GITHUB}>GitHub 仓库</ExternalButton>
          <ExternalButton href={PYPI} variant="ghost">
            PyPI 包
          </ExternalButton>
          <ExternalButton href="/docs" variant="ghost">
            阅读文档 →
          </ExternalButton>
        </div>
        <div className="mx-auto mt-10 max-w-2xl text-left">
          <CodeBlock
            code={`brew tap Airine/storage-agent
brew trust Airine/storage-agent
brew install storage-agent-tui
storage-agent`}
          />
        </div>
      </section>

      {/* 场景 / 特性 */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-center text-2xl font-semibold">为什么需要它</h2>
        <Cards className="mt-8">
          <Card
            title="① AI 解释并排序"
            description="磁盘容量、缓存与风险来自本地确定性扫描；AI 只负责解释占用构成、说明每项该不该删，并给出优先顺序。模型只读、无工具权限。"
          />
          <Card
            title="② 三档风险分级"
            description="safe 普通确认即可清理；review 需要你理解内容并非纯缓存；protected（如 Documents 下的项目）需 macOS 管理员身份验证。"
          />
          <Card
            title="③ 移入废纸篓，可恢复"
            description="所有清理都移动到 macOS 废纸篓而不是永久删除，配套 SQLite 审计日志与撤销入口，清空废纸篓前随时可以反悔。"
          />
        </Cards>
      </section>

      {/* 快速用法 */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-center text-2xl font-semibold">三步完成一次优化</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: '1',
              title: '生成 AI 建议',
              desc: '启动 TUI 后点击「① 生成建议」，AI 解释最大占用并排序候选。',
            },
            {
              step: '2',
              title: '选择清理项',
              desc: '在候选表中按风险加入清理清单，绝对敏感路径会被安全规则直接拒绝。',
            },
            {
              step: '3',
              title: '确认并恢复',
              desc: '输入确认文字后移入废纸篓；需要时在 History & Undo 里一键恢复。',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="grid size-8 place-items-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 安装方式 */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-center text-2xl font-semibold">安装方式</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold">🍺 Homebrew（推荐）</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              来自自定义 tap，自动管理 Python 依赖。
            </p>
            <div className="mt-4">
              <CodeBlock
                code={`brew tap Airine/storage-agent
brew install storage-agent-tui`}
              />
            </div>
            <a
              href={TAP}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-emerald-600 hover:underline"
            >
              tap 仓库 →
            </a>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold">🐍 PyPI</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              通过 uv / pipx 安装，隔离环境、开箱即用。
            </p>
            <div className="mt-4">
              <CodeBlock code={`uv tool install storage-agent-tui
# 或
pipx install storage-agent-tui`} />
            </div>
            <a
              href={PYPI}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-emerald-600 hover:underline"
            >
              PyPI 页面 →
            </a>
          </div>
        </div>
      </section>

      {/* 在线体验（Mock 数据交互版） */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-center text-2xl font-semibold">在线体验</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 dark:text-zinc-300">
          无需安装，直接体验核心交互——生成 AI 建议、按风险勾选清理项（演示数据，纯前端模拟）。
        </p>
        <div className="mt-8">
          <MockTUI />
        </div>
      </section>

      {/* 真实界面截图 */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-center text-2xl font-semibold">三步核心流程</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 dark:text-zinc-300">
          AI 解释 → 分级选择 → 移入废纸篓可恢复，每一步都清晰可见。
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { src: '/screenshots/step1-ai-advice.svg', title: '① AI 解释并排序', desc: 'AI 分析磁盘占用、说明每项风险与优先级' },
            { src: '/screenshots/step2-select-candidates.svg', title: '② 分级选择清理项', desc: 'safe / review / protected 三档，敏感路径自动拦截' },
            { src: '/screenshots/step3-history-undo.svg', title: '③ 移入废纸篓，可恢复', desc: 'SQLite 审计 + History & Undo 一键撤销' },
          ].map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <a href={shot.src} target="_blank" rel="noreferrer" className="block border-b border-zinc-200 bg-zinc-950 dark:border-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.title} className="w-full" loading="lazy" />
              </a>
              <figcaption className="p-4">
                <h3 className="font-semibold">{shot.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{shot.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-10 text-center text-sm text-zinc-500 dark:border-zinc-800">
        <p>
          Storage Agent · MIT License ·{' '}
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-emerald-600">
            GitHub
          </a>{' '}
          ·{' '}
          <a href={PYPI} target="_blank" rel="noreferrer" className="hover:text-emerald-600">
            PyPI
          </a>{' '}
          ·{' '}
          <a href="/docs" className="hover:text-emerald-600">
            文档
          </a>
        </p>
      </footer>
    </main>
  );
}
