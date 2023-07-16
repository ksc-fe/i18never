import { updateSourceAndOffset, ColumnOffset } from '../src/generate';

test('insert tag', () => {
    expect(update([], 1)).toStrictEqual([`1[$_:]2345`, [[1, 5]]]);
});
test('insert before tagged source', () => {
    expect(update(update([], 2), 1)).toStrictEqual([
        `1[$_:]2[$_:]345`,
        [
            [1, 5],
            [2, 5],
        ],
    ]);
    expect(update(update(update([], 2), 1), 0)).toStrictEqual([
        `[$_:]1[$_:]2[$_:]345`,
        [
            [0, 5],
            [1, 5],
            [2, 5],
        ],
    ]);
});

test('insert after tagged source', () => {
    expect(update(update([], 1), 2)).toStrictEqual([
        `1[$_:]2[$_:]345`,
        [
            [1, 5],
            [2, 5],
        ],
    ]);
    expect(update(update(update([], 1), 2), 3)).toStrictEqual([
        `1[$_:]2[$_:]3[$_:]45`,
        [
            [1, 5],
            [2, 5],
            [3, 5],
        ],
    ]);
});

test('replace tag', () => {
    expect(update([], 1, undefined, undefined, 'x')).toStrictEqual([
        `1[$_:]345`,
        [[1, 4]],
    ]);
});

test('replace before tagged source', () => {
    expect(update(update([], 3), 2, undefined, 'x')).toStrictEqual([
        `12[$_:][$_:]45`,
        [
            [2, 4],
            [3, 5],
        ],
    ]);
    expect(
        update(update(update([], 3), 2, undefined, 'x'), 0, undefined, 'xx')
    ).toStrictEqual([
        `[$_:][$_:][$_:]45`,
        [
            [0, 3],
            [2, 4],
            [3, 5],
        ],
    ]);
});

test('replace after tagged source', () => {
    expect(update(update([], 1), 2, undefined, 'x')).toStrictEqual([
        `1[$_:]2[$_:]45`,
        [
            [1, 5],
            [2, 4],
        ],
    ]);
    expect(
        update(update(update([], 1), 2, undefined, 'x'), 3, undefined, 'xx')
    ).toStrictEqual([
        `1[$_:]2[$_:][$_:]`,
        [
            [1, 5],
            [2, 4],
            [3, 3],
        ],
    ]);
});

type Result = [string, ColumnOffset[]];
function update(
    columnsOffset: ColumnOffset[],
    column: number,
    source?: string,
    newIdentifier?: string,
    oldIndentifer?: string
): Result;
function update(
    result: Result,
    column: number,
    newIdentifier?: string,
    oldIndentifer?: string
): Result;
function update(
    columnsOffsetOrResult: ColumnOffset[] | Result,
    column: number,
    source?: string,
    newIdentifier?: string,
    oldIndentifer?: string
) {
    let columnsOffset = columnsOffsetOrResult as ColumnOffset[];
    if (typeof columnsOffsetOrResult[0] === 'string') {
        columnsOffset = columnsOffsetOrResult[1] as ColumnOffset[];
        oldIndentifer = newIdentifier;
        newIdentifier = source;
        source = columnsOffsetOrResult[0];
    }
    if (source === undefined) source = '12345';
    if (newIdentifier === undefined) newIdentifier = '[$_:]';
    if (oldIndentifer === undefined) oldIndentifer = '';

    const code = updateSourceAndOffset(
        newIdentifier,
        oldIndentifer,
        source,
        columnsOffset,
        column
    );

    return [code, columnsOffset] as const;
}
