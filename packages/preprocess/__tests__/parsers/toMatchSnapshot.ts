import { KeyItem } from '../../src/parsers';

export function getToMatchSnapshot(parse: (source: string) => KeyItem[]) {
    return (source: string) => {
        const keys = parse(source);
        // remove entity property
        keys.forEach((key) => {
            // @ts-ignore
            delete key.entity;
        });
        expect(keys).toMatchSnapshot();
    };
}
