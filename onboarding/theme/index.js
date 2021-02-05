// Theme.js
import buttons from './buttons';
import colors from './colors';
import forms from './forms';
import links from './links';
import meta from './meta';
import textStyles from './textStyles';
import typography from './typography';
import styles from './styles';

export default {
  styles,
  buttons,
  colors,
  forms,
  links,
  textStyles,
  ...meta,
  ...typography
};
