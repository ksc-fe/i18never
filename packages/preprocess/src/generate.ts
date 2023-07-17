import { KeyItem } from './parsers';
import { InquireResultItem } from './inquire';
import { getIdentifier } from './helpers';

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
            const loc = item.loc;
            const line = loc.line - 1; // line starts from 1

            let columnsOffset = lineColumnsOffset[line];
            if (!columnsOffset) {
                columnsOffset = lineColumnsOffset[line] = [];
            }

            lines[line] = updateSourceAndOffset(
                `[${newIdentifier}]`,
                oldIndentifer ? `[${oldIndentifer}]` : oldIndentifer,
                lines[line],
                columnsOffset,
                loc.column - 1
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
