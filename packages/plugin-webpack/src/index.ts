import { Compiler } from 'webpack';
import { i18nTrans } from '@i18never/parse';
import { TempKeyItem } from 'packages/parse/dist/types';
import axios from 'axios';
import HtmlWebpackPlugin from 'html-webpack-plugin';

class I18neverWebpackPlugin {
    private allAppKeys: TempKeyItem[] = [];
    private i18nVersion = '';

    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap(
            'I18neverWebpackPlugin',
            (compilation) => {
                HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                    'I18neverWebpackPlugin',
                    (data, callback) => {
                        data.html = data.html.replace(
                            '</head>',
                            `${this.generateScript(this.i18nVersion)}</head>`
                        );
                        callback(null, data);
                    }
                );
            }
        );

        compiler.hooks.normalModuleFactory.tap(
            'I18neverWebpackPlugin',
            (nmf) => {
                nmf.hooks.parser
                    .for('javascript/auto')
                    .tap('I18neverWebpackPlugin', (parser) => {
                        parser.hooks.program.tap(
                            'I18neverWebpackPlugin',
                            async () => {
                                const { resource } = parser.state.module;

                                if (
                                    !resource.match(
                                        /\.(pug|vue|tsx|jsx|js|ts)$/
                                    ) ||
                                    resource.includes('@i18never/client')
                                ) {
                                    return;
                                }

                                const code = parser.state.module._source._value;
                                const { transCode, allKeys } = await i18nTrans(
                                    code,
                                    resource
                                );
                                this.allAppKeys.push(...allKeys);
                                parser.state.module._source._value = transCode;
                            }
                        );
                    });
            }
        );

        compiler.hooks.afterEmit.tapPromise(
            'I18neverWebpackPlugin',
            async () => {
                const { data } = await axios.post(
                    'http://localhost:3001/upload',
                    {
                        allAppKeys: this.allAppKeys,
                    }
                );
                this.i18nVersion = data.version;
            }
        );
    }

    private generateScript(version: string) {
        return `
      <script>
          document.write('<scr'+'ipt src="http://localhost:8080/api/test/'+localStorage.getItem('I18neverLang')+ '/${version}"></scr'+'ipt>');
      </script>
      `;
    }
}

export default I18neverWebpackPlugin;
