module.exports = {
  out: 'main.js',
  name: 'main',
  shim: {
    // standard require.js shim options
  },
  paths: {
    'tpl': 'lib/text',
    'Vue': 'lib/vue',
    "simple": "../simple",
    'utils': '../utils'
  }
  // ... more require.js options
};