import fs from 'fs';
import path from 'path';
import { Options, setOptions } from '@i18never/shared';

type CliOptions = {
    token?: string;
    source?: string;
    configFile?: string;
};

const defaultConfigFile = 'i18never.config.js';

export function setConfig(options: Partial<CliOptions>) {
    const config = getConfigFromFile(options.configFile);
    setOptions({ ...config, ...options });
}

function getConfigFromFile(configFile?: string): Partial<Options> {
    if (configFile) return require(configFile);

    if (!configFile) {
        let currentDir = process.cwd();
        while (currentDir !== '/') {
            const file = path.join(currentDir, defaultConfigFile);
            if (fs.existsSync(file)) {
                return require(file);
            }
            currentDir = path.dirname(currentDir);
        }
    }

    return {};
}
