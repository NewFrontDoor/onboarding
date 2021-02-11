const defaults = {nonTextBehavior: 'remove'};

export function blocksToText(blocks, options_ = {}) {
  const options = Object.assign({}, defaults, options_);
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`;
      }

      return block.children.map((child) => child.text).join('');
    })
    .join('\n\n');
}

export function submitForm(values) {
  fetch('/api/submit', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
