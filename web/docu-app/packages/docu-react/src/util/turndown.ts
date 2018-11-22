const Turndown = require('turndown').default;
const turndown = new Turndown();

turndown
  .addRule('pre', {
    filter: ['pre'],
    replacement: function(content: string) {
      return '```' + content + '```';
    }
  });

export const convertToMd = (desc = '') =>
  turndown.turndown((desc || '').replace(/(?:\r\n|\r|\n)/g, '<br>'));


