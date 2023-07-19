import { program } from 'commander';
import { tag } from './tag';
import { preCommit } from './preCommit';
import { initOptions } from '@i18never/shared';

export { preCommit, tag };

program.version(require('../package.json').version);

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
