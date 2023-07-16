import { KeyItem } from './visitors';
import { InquireResultItem } from './inquire';
import { getIdentifier } from './helpers';
import * as t from '@babel/types';

export type ColumnOffset = [number, number];

export function generate(
    source: string,
    keys: KeyItem[],
    translations: InquireResultItem[]
) {
    const lines = source.split('\n');
    const lineColumnsOffset: ColumnOffset[][] = [];
    keys.forEach((item, index) => {
        const translationDetails = translations[index].translationDetails;
        const newIdentifier = getIdentifier(translationDetails);
        const oldIndentifer = item.identifier || '';
        if (newIdentifier !== oldIndentifer) {
            let {
                loc: {
                    start: { line, column },
                },
            } = item;
            --line; // line starts from 1
            // if the text is in string or template string, we should add 1
            // because it has quotation mark
            const node = item.path.node;
            if (t.isStringLiteral(node) || t.isTemplateLiteral(node)) {
                ++column;
            }
            let columnsOffset = lineColumnsOffset[line];
            if (!columnsOffset) {
                columnsOffset = lineColumnsOffset[line] = [];
            }
            lines[line] = updateSourceAndOffset(
                `[${newIdentifier}]`,
                oldIndentifer ? `[${oldIndentifer}]` : oldIndentifer,
                lines[line],
                columnsOffset,
                column
            );
        }
    });

    return lines.join('\n');
}

export function updateSourceAndOffset(
    newIdentifier: string,
    oldIndentifer: string,
    lineCode: string,
    columnsOffset: ColumnOffset[],
    column: number
) {
    let offset = 0;
    let index = 0;
    for (; index < columnsOffset.length; index++) {
        const [_column, _offset] = columnsOffset[index];
        if (_column >= column) break;
        offset += _offset;
    }

    const newColumn = column + offset;
    const oldLength = oldIndentifer.length;
    columnsOffset.splice(index, 0, [column, newIdentifier.length - oldLength]);

    return (
        lineCode.substring(0, newColumn) +
        newIdentifier +
        lineCode.substring(newColumn + oldLength)
    );
}
