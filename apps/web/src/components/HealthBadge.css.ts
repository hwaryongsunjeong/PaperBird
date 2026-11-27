import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  fontSize: '14px',
});

export const tone = styleVariants({
  ok: { color: vars.color.success, background: vars.color.successBackground },
  pending: {
    color: vars.color.pending,
    background: vars.color.pendingBackground,
  },
});
