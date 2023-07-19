# I18Never

A tool to deal with the internationalization (i18n) automatically.

# Usage

## Vite

```
npm install rollup-plugin-i18never @i18never/cli -D
```

or 

```
yarn add rollup-plugin-i18never @i18never/cli -D
```

Add i18never plugin to `vite.config.js`

```
import i18never from 'rollup-plugin-i18never';

export default defineConfig({
    plugins: [i18never()],
});
```

### API

1. `i18never(options: Options)`

```ts
type Options = {
    // match the text that will be translated, inlucde escaped unicode
    matchRegexp?: RegExp;
    // the graphql api for getting translations
    uri?: string;
    // the source to distinguish clients
    source?: string;
    // the prefix string of identifier
    prefix?: string;
    // the ignore tag indicates we shouldn't translate this string
    ignore?: string;
    // the module providing the translation function, namely $_
    clientModule?: string;
    clientFunction?: string;
    // the token to request graphql api
    token?: string;
    // the config file
    configFile?: string;
    // the files that will be transformed
    // include has a higher priority than exclude
    include?: MatchRule[];
    // the files that will not be transformed
    exclude?: MatchRule[];
    // the key for store the current language
    langKey?: string;
    // the location to store langKey
    storageType?: 'cookie' | 'localStorage' | 'sessionStorage';

};
```


## Tag

You should tag your codes before building.

```
npx i18never tag ./src
```

Specify the token to get or create dictionaries.

Via config file `i18never.config.js`

```
module.exports = {
    token: 'YOUR TOKEN',
    source: 'YOUR SOURCE NAME',
}
```

Via environment variables

```
I18NEVER_TOKEN=YOUR_TOKEN I18NEVER_TOKEN=YOUR_SOURCE_NAME npx i18never tag ./src
```
