const baseColors = {
  background: '#f8eeef',
  accent: '#6b5575',
  primary: '#695674',
  muted: '#6a5271',
  text: '#191018'
};
  
  export default {
    ...baseColors,
    // This is a workaround for consuming our own defined values
    active: baseColors.accent
  };

  