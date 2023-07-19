const { rollup, generate } = require('rollup');
const { join, resolve, basename } = require('path');
const typescript = require('rollup-plugin-typescript2');
const replace = require('@rollup/plugin-replace');
const fs = require('fs');

const cwd = process.cwd();
const pkgJson = require(join(cwd, 'package.json'));
const options = require('minimist')(process.argv.slice(2), {
    boolean: ['minify', 'replace'],
    default: {
        env: 'development',
        ext: 'js',
        format: 'cjs',
        name: pkgJson.name,
        replace: true,
        version: pkgJson.version,
        entry: 'src/index.ts',
    },
});
const resolveRoot = (path) => resolve(__dirname, '../', path);
const plugins = [
    typescript({
        tsconfig: resolve(__dirname, '../tsconfig.json'),
        exclude: ['**/__tests__'],
        clean: true,
        cacheRoot: resolveRoot(
            `node_modules/.rpt2_cache/${pkgJson.name}_${options.env}_${options.format}`
        ),
        tsconfigOverride: {
            compilerOptions: {
                declaration: true,
                // declarationMap: true,
                sourceMap: false,
                module: 'ESNext',
                rootDir: join(cwd, 'src'),
                paths: null,
            },
            include: [join(cwd, 'src')],
        },
    }),
];

if (options.replace) {
    plugins.push(
        replace({
            values: {
                'process.env.NODE_ENV': JSON.stringify(options.env),
            },
            preventAssignment: true,
            delimiters: ['', ''],
        })
    );
}

const format = options.format;
const external = Object.keys(pkgJson.dependencies || {}).concat('../package.json');
const input = join(cwd, options.entry);

async function build() {
    if (!fs.existsSync(input)) return;

    try {
        const buddle = await rollup({ input, external, plugins });
        await buddle.write({
            file: `dist/${basename(input, '.ts')}.${options.ext}`,
            format,
            interop: 'esModule',
        });
    } catch (e) {
        console.error(e.message);
    }
}

build();
