#!/usr/bin/env node

const program = require('commander');
const tag = require('../lib/index');
const preCommit = require('../lib/preCommit');
const loadConfig = require('../lib/check');

program.version(require('../package.json').version);

program
    .command('tag <url>')
    .option('-t, --token [token]', 'Your Token')
    .description('Tag the appropriate file under the current file or folder')
    .action((url, options) => {
        loadConfig(options);
        tag(url);
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
