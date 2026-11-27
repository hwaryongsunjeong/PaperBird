import type { Metadata } from 'next';
import '@/styles/global.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'PaperBird',
  description: '지능형 문서 요약 및 딜리버리',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
