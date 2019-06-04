import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
// import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

import pkg from './package.json'

const LIBRARY_NAME = 'index';

export default {
    input: `src/${LIBRARY_NAME}.ts`,
    output: [
        // {
        //     file: pkg.main,
        //     name: camelCase(LIBRARY_NAME),
        //     format: 'cjs',
        //     sourcemap: true
        // },
        {
            file: pkg.main,
            name: "FD",
            format: 'iife',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'esm',      // esm – Keep the bundle as an ES module file, suitable for other bundlers and inclusion as a <script type=module> tag in modern browsers
            sourcemap: true     // https://rollupjs.org/guide/en/
        },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
        include: 'src/**',
    },
    plugins: [
        // Allow json resolution
        json(),

        // Compile TypeScript files
        typescript({useTsconfigDeclarationDir: true}),

        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),

        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
                "node_modules/react-dom/index.js": ["render"]
            }
        }),

        // Resolve source maps to the original source
        sourceMaps(),
    ],
}
