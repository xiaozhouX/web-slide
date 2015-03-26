module.exports = {
  out: 'main.js',
  name: 'main',
  paths: {
    "react": "bower_components/react/react-with-addons",
    "JSXTransformer": "bower_components/react/JSXTransformer",
    "jsx": "bower_components/requirejs-react-jsx/jsx",
    "text": "bower_components/requirejs-text/text",
    "utils": "../utils"
  },
  shim: {
    "react": {
      "exports": "React"
    },
    "JSXTransformer": "JSXTransformer"
  },
  jsx: {
    fileExtension: ".jsx",
    transformOptions: {
      harmony: true,
      stripTypes: false
    },
    usePragma: false
  }
};