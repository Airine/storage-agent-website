import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { pageTree } from '@/app/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={pageTree}
      nav={{ title: 'Storage Agent', transparentMode: 'top' }}
      links={[
        { text: 'GitHub', url: 'https://github.com/Airine/storage-optimizer' },
        { text: 'PyPI', url: 'https://pypi.org/project/storage-agent-tui/' },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
