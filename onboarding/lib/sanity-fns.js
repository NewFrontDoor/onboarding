import client from './sanity';

const defaults = {nonTextBehavior: 'remove'};

export function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`;
      }

      return block.children.map(child => child.text).join('');
    })
    .join('\n\n');
}

export function submitForm(values) {
  const inputs = {
    targetEmail: 'support@newfrontdoor.org',
    message: values
  };

  fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  fetch('/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputs)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
