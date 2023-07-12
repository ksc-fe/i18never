const { execSync } = require('child_process');

module.exports = () => {
    const files = execSync('git diff --cached --name-only --diff-filter=ACM', {
        encoding: 'utf8',
    })
        .trim()
        .split('\n');
    files.forEach((file) => {
        try {
            execSync(`i18never tag ${file}`, { stdio: 'inherit' });
        } catch (e) {
            process.exit(1);
        }
    });
};
