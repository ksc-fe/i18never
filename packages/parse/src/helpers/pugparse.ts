import pugparse from 'pug-parser';
import puglex from 'pug-lexer';
import pugwalk from 'pug-walk';
import { KeyItem } from '../types';
import { hasChinese } from './utils';

export default async function parsePug(
    source: string,
    filename: string
): Promise<KeyItem[]> {
    const keys: KeyItem[] = [];
    const tokens = puglex(source, { filename });
    const ast = pugparse(tokens, { filename });
    pugwalk(
        ast,
        function before(node: any) {
            if (node.type === 'Text') {
                if (!node.val || !hasChinese(node.val)) return;
                keys.push({
                    filename: filename,
                    key: node.val,
                    loc: {
                        start: {
                            line: node.line,
                            column: node.column,
                        },
                    },
                });
            }
        },
        {
            includeDependencies: true,
        }
    );
    console.log('keys', keys);
    return keys;
}
