#!/usr/bin/env node
import { program } from 'commander';
import { tag } from './tag';
import preCommit from './preCommit';
import pkg from '../package.json';
import { initOptions } from '@i18never/shared';

program.version(pkg.version);

program
    .command('tag <path>')
    .option('-t, --token [token]', 'The token to request api.')
    .option('-s, --source [source]', 'Indicate where the keys are added from.')
    .option('-c, --config [configFile]', 'Specify the config file.')
    .description('Tag the appropriate file under the current file or folder.')
    .action((path, options) => {
        initOptions(options);
        tag(path);
    });

program
    .command('pre-commit')
    .option('-t, --token [token]', 'The token to request api.')
    .option('-s, --source [source]', 'Indicate where the keys are added from.')
    .option('-c, --config [configFile]', 'Specify the config file.')
    .description(
        'Check the temporary files and perform marking operations before git commit'
    )
    .action((options) => {
        initOptions(options);
        preCommit();
    });

program.parse(process.argv);
