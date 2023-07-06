const fs = require('fs');
const path = require('path');
const program = require('commander');

module.exports = (options) => {
  const rootDir = findProjectRoot();
  
  const tokenOption = options.token;
  if (!rootDir && !tokenOption) {
    console.error("Missing permission information. Please configure the. i18neverrc.js file in the root directory or use the i18never command to explicitly configure the - t parameter");
    process.exit(1);
  }

  if (tokenOption) {
    process.env.I18NEVER_TOKEN = tokenOption;
  } else {
    const configPath = path.join(rootDir, '.i18neverrc.js');
    const configOptions = loadConfigFile(configPath);
    process.env.I18NEVER_TOKEN = configOptions.token;
  }
}

function findProjectRoot() {
  let currentDir = process.cwd();
  console.log('currentDir', currentDir);
  while (currentDir !== '/') {
    if (fs.existsSync(path.join(currentDir, '.i18neverrc.js'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  return null;
}

function loadConfigFile(filePath) {
  const config = require(filePath);
  return config;
}
