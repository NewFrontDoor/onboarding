export default {
  h1: {
    fontSize: '2xl',
    fontFamily: 'heading',
    fontWeight: 'normal'
  },
  h2: {
    fontSize: 'xl',
    fontWeight: 'normal',
  },
  h3: {
    fontSize: 'lg',
    fontWeight: 'normal',
    fontStyle: 'normal'
  },
  h4: {
    fontSize: 'md',
    fontWeight: 'normal'
  },
  p: {
    fontWeight: 'normal',
    lineHeight: 'body'
  },
  a: {
    color: 'accent',
    fontFamily: 'body',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:visited': {
      color: 'text'
    },
    '&:hover': {
      color: 'text'
    },
    '&:active': {
      color: 'text'
    }
  },
  ul: {
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body'
  },
  table: {
    border: 'none',
    borderLeft: '1px solid #eee',
    borderRight: '1px solid #eee',
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    thead: {
      tr: {
        backgroundColor: '#eee'
      }
    }
  },
  tr: {
    ':nth-of-type(even)': {
      backgroundColor: '#eee'
    }
  },
  th: {
    padding: '15px 5px'
  },
  td: {
    padding: '15px 5px'
  },
  fieldset: {
    border: 'none'
  }
};
