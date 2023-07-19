import { execSync } from 'child_process';
import { tag } from './tag';

export async function preCommit() {
    const files = execSync('git diff --cached --name-only --diff-filter=ACM', {
        encoding: 'utf8',
    })
        .trim()
        .split('\n');

    for (const file of files) {
        await tag(file);
    }
}
