const {rollup, generate} = require('rollup');
const {join, resolve} = require('path');
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
    }
});
const resolveRoot = path => resolve(__dirname, '../',  path);
const plugins = [
    typescript({
        tsconfig: resolve(__dirname, '../tsconfig.json'),
        exclude: ['**/__tests__'],
        cacheRoot: resolveRoot(`node_modules/.rpt2_cache/${pkgJson.name}_${options.env}_${options.format}`),
        tsconfigOverride: {
            compilerOptions: {
                declaration: true,
                // declarationMap: true,
                sourceMap: false,
                module: 'ESNext',
                rootDir: resolveRoot('./packages/i18never/src'),
            },
            include: [resolveRoot('./packages/i18never/src')],
        },
    }),
];

if (options.replace) {
    plugins.push(replace({
        values: {
            'process.env.NODE_ENV': JSON.stringify(options.env),
        },
        preventAssignment: true,
        delimiters: ['', ''],
    }));
}

const format = options.format;
const external = Object.keys(pkgJson.dependencies || {});
const input = join(cwd, options.entry);

async function build() {
    if (!fs.existsSync(input)) return;

    try {
        const buddle = await rollup({input, external, plugins});
        await buddle.write({
            file: `dist/index.${options.ext}`,
            format,
        });
    } catch (e) {
        console.error(e.message);
    }

    // const {Extractor, ExtractorConfig} = require('@microsoft/api-extractor');
    // const extractorConfigPath = resolve(cwd, 'api-extractor.json');
    // const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath);
    // const extractorResult = Extractor.invoke(extractorConfig, {
        // localBuild: true,
        // showVerboseMessages: true,
        // typescriptCompilerFolder: resolveRoot('node_modules/typescript'),
    // });
}

build();
