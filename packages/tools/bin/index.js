#!/usr/bin/env node

const program = require('commander');

program.version(require('../package.json').version);

program
    .command('tag <url>')
    .description('Tag the appropriate file under the current file or folder')
    .action((name) => {
        require('../lib/index')(name);
    });

program.parse(process.argv);
