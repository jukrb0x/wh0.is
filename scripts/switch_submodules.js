const { execSync } = require('child_process');
const fs = require('fs');

// Read .gitmodules file and parse submodule paths
const gitmodules = fs.readFileSync('.gitmodules', 'utf-8');
const submodulePaths = gitmodules.match(/path = (.*)/g).map((line) => line.split('=')[1].trim());

// Loop through each submodule and switch to main branch
submodulePaths.forEach((submodulePath) => {
    console.log(`Switching ${submodulePath} to main branch`);
    execSync(`cd ${submodulePath} && git checkout main && cd ..`, { stdio: 'inherit' });
});
