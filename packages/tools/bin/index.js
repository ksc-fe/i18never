#!/usr/bin/env node

const program = require('commander');
const tag = require('../lib/index');
const preCommit = require('../lib/preCommit');

program.version(require('../package.json').version);

program
    .command('tag <url>')
    .description('Tag the appropriate file under the current file or folder')
    .action((name) => {
        tag(name);
    });

program
    .command('precommit')
    .description(
        'Check the temporary files and perform marking operations before git commit'
    )
    .action(() => {
        preCommit();
    });

program.parse(process.argv);
