import { createGlobalTheme } from '@vanilla-extract/css';

// 색·간격·글꼴은 이 토큰으로만 쓴다
export const vars = createGlobalTheme(':root', {
  color: {
    background: '#ffffff',
    text: '#1a1a1a',
    muted: '#6b6b6b',
    success: '#1f7a3a',
    successBackground: '#e6f4ea',
    pending: '#8a6d00',
    pendingBackground: '#fff6d6',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
  },
  radius: {
    pill: '999px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
  },
  font: {
    body: 'system-ui, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
  },
});
