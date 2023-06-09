// import { Compiler, sources } from 'webpack';
// import { i18nTrans } from '@i18never/parse';
// import { getSdk } from '@i18never/graphql';
// import { GraphQLClient } from 'graphql-request';
// import { TempKeyItem } from '@i18never/parse/dist/types';

// interface I18nneverOptions {
//     root?: string;
//     langKey?: string;
//     storageType?: string;
// }

// const defaultOptions: I18nneverOptions = {
//     root: 'src',
//     langKey: '',
//     storageType: '',
// };
// const client = new GraphQLClient('http://localhost:3003/');
// const sdk = getSdk(client);

// class I18nneverPlugin {
//     allAppKeys: TempKeyItem[];
//     i18nVersion: string;
//     options: I18nneverOptions;

//     constructor(options: I18nneverOptions = {}) {
//         this.allAppKeys = [];
//         this.i18nVersion = '';
//         this.options = { ...defaultOptions, ...options };
//     }

//     apply(compiler: Compiler): void {
//         compiler.hooks.compilation.tap(
//             'I18nneverPlugin',
//             (compilation, { normalModuleFactory }) => {
//                 compilation.hooks.optimizeAssets.tap(
//                     'I18nneverPlugin',
//                     async (assets) => {
//                         const promises = Object.entries(assets).map(
//                             async ([filename, asset]) => {
//                                 if (
//                                     !filename.match(
//                                         /\.(pug|vue|tsx|jsx|js|ts)$/
//                                     ) ||
//                                     filename.includes('@i18never/client')
//                                 ) {
//                                     return;
//                                 }

//                                 const code = asset.source().toString();
//                                 const { transCode, allKeys } = await i18nTrans(
//                                     code,
//                                     filename
//                                 );
//                                 this.allAppKeys.push(...allKeys);
//                                 assets[filename] = new sources.RawSource(
//                                     transCode
//                                 );
//                             }
//                         );

//                         await Promise.all(promises);
//                     }
//                 );
//             }
//         );

//         compiler.hooks.afterCompile.tapAsync(
//             'I18nneverPlugin',
//             async (compilation, callback) => {
//                 const version = await this.queryVersion(this.allAppKeys);
//                 console.log(version);
//                 this.i18nVersion = version;
//                 callback();
//             }
//         );

//         compiler.hooks.emit.tapAsync(
//             'I18nneverPlugin',
//             (compilation, callback) => {
//                 const entryHtmlFile = compilation.assets['index.html'];
//                 if (entryHtmlFile) {
//                     const html = entryHtmlFile.source().toString();
//                     const newHtml = html.replace(
//                         '</head>',
//                         `${this.generateScript(
//                             this.i18nVersion,
//                             this.options
//                         )}</head>`
//                     );
//                     compilation.assets['index.html'] = new sources.RawSource(
//                         newHtml
//                     );
//                 }
//                 callback();
//             }
//         );
//     }

//     async queryVersion(keys: TempKeyItem[]): Promise<string> {
//         const data = await sdk.GetTranslationByKey({ keys });
//         const version = Object.values(data).join('');
//         return version;
//     }

//     generateScript(version: string, options: I18nneverOptions): string {
//         return `
//     <script>
//       window.I18N_VERSION='${version}';
//       window.I18N_CONFIG=${JSON.stringify(options)};
//     </script>
//     `;
//     }
// }

// export default I18nneverPlugin;
