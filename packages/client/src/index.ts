type Tags = Record<string, string>;
type Data = (string | number)[];
type I18NeverData = Record<string, Tag[]>;
type Tag = { name: string; value: string };

export function $_(key: string, data?: Data): string;
export function $_(key: string, tags?: Tags): string;
export function $_(key: string, data?: Data, tags?: Tags): string;
export function $_(key: string, data?: Data | Tags, tags?: Tags): string {
    const i18n = (globalThis.I18NeverData || {}) as I18NeverData;
    const lang = (globalThis.I18NeverLang || 'zh') as string;
    const translations = i18n[key];

    if (!Array.isArray(data)) {
        tags = data;
        data = undefined;
    }

    if (translations) {
        const tagName = tags ? tags[lang] : 'default';
        const tag = translations.find((t) => t.name === tagName);
        if (process.env.NODE_ENV !== 'production') {
            if (!tag) {
                throw new Error(
                    `Cannot find the tag: "${tagName}" for key: "${key}" in language: "${lang}".`
                );
            }
        }
        key = tag!.value || key;
    }

    return generateResult(key, data);
}

const valueRegexp = /\{([^}\s]+)}/g;
function generateResult(value: string, data?: Array<string | number>) {
    if (data) {
        value = value.replace(valueRegexp, (nouse, variable) => {
            variable = data[variable];
            return !isNullOrUndefined(variable) ? variable.toString() : nouse;
        });
    }

    return value;
}

function isNullOrUndefined(value: unknown) {
    return value === null || value === undefined;
}
