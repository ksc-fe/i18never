#!/usr/bin/env node

const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const walk = require('./walk');
const path = require('path');
const { i18nparse } = require('@i18never/parse');

module.exports = async (name) => {
    let pross = ora();
    // pross.start('Extracting...\n');

    let filelist = walk(name);

    for (let file of filelist) {
        if (!file.match(/\.(pug|vue|tsx|jsx|js|ts)$/)) {
            continue;
        }
        let tempsource = fs.readFileSync(file, 'utf8');
        await i18nparse(tempsource, file);
        console.log(chalk.green(file + '...done\n'));
    }
    pross.succeed('Extraction completed');
};
