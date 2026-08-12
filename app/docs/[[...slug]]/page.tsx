import { getPage, getPages } from '@/app/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsPage, DocsBody } from 'fumadocs-ui/layouts/notebook/page';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const body = page.data.body({});

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsBody>{body}</DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return getPages().map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getPage(slug);
  return { title: page?.data.title ?? '文档' };
}
