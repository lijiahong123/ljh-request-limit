
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
    input: './src/main.js',
    output: {
      file: './dist/index.js',
      format: 'umd',
      name: "asyncPool",
    },
    plugins: [
        resolve(),
        babel({ 
            exclude: /node_modules/
        }),
        terser()
      ]
  };