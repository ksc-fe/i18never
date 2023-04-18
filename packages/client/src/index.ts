type Tags = Record<string, string>;

const valueRegexp = /\{([^\}\s]+)\}/g;
function createLocalize() {
    let i18n = {};
    let lang = 'zh';
    return {
        localize: (i18nLang, i18nData) => {
            i18n = i18nData;
            lang = i18nLang;
        },
        _$(
            key: string,
            data?: Tags | Array<string | number>,
            langTags?: Tags
        ): string {
            const translation = i18n[key];
            if (!translation) return key;

            const langTag = Array.isArray(data)
                ? langTags?.[lang]
                : data?.[lang];
            const tag = langTag
                ? translation.tags.find((t) => t.name === langTag)
                : translation.tags[0];

            if (!data) return tag.value;

            const values = Array.isArray(data) ? data : Object.values(data);
            return _generateResult(tag.value, values);
        },
    };
}

function _generateResult(value: string, data?: Array<string | number>) {
    if (data) {
        value = value.replace(valueRegexp, (nouse, variable) => {
            variable = data?.[variable] ?? undefined;
            return !isNullOrUndefined(variable) ? variable.toString() : nouse;
        });
    }

    return value;
}

function isNullOrUndefined(value) {
    return value === null || value === undefined;
}

const { _$, localize } = createLocalize();

export { _$, localize };
