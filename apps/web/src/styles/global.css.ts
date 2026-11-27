import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
});
