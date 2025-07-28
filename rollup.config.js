const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const copy = require('rollup-plugin-copy');
const dts = require('rollup-plugin-dts').default;

module.exports = [
  {
    input: 'src/entryPointProduction.tsx',
    output: [
      {
        file: 'library/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
      }),
      commonjs(),
      copy({
        targets: [
          { src: 'package.json', dest: 'library' },
        ],
      }),
    ],
  },

  {
    input: 'src/entryPointProduction.tsx',
    output: {
      file: 'library/index.d.ts',
      format: 'esm',
    },
    plugins: [dts({
      tsconfig: './tsconfig.build.json',
    })],
  },
];
