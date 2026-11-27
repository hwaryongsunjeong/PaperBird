import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  padding: vars.space.lg,
});

export const description = style({
  margin: 0,
  color: vars.color.muted,
});
