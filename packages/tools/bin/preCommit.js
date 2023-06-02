#!/usr/bin/env node

const program = require('commander');
const preCommit = require('../lib/preCommit');

program.version(require('../package.json').version);

program.description('Mark before code commit').action(() => {
    preCommit();
});

program.parse(process.argv);
