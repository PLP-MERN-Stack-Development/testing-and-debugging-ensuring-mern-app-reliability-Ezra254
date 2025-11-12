/**
 * Shared Babel configuration for Jest transforms.
 * - Transpiles modern JS/JSX for client tests
 * - Targets current Node for server-side code
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-react',
  ],
};

