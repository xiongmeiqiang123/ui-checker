// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sass from 'rollup-plugin-sass';



export default {
  input: 'src/index.ts',
  output: {
    dir: 'output',
    format: 'umd'
  },
  plugins: [sass(), commonjs(), nodeResolve(), typescript()]
};