const { execSync } = require('child_process');
const fs = require('fs');

// Read .gitmodules file and parse submodule paths
const gitModules = fs.readFileSync('.gitmodules', 'utf-8');
const submodulePaths = gitModules.match(/path = (.*)/g).map((line) => line.split('=')[1].trim());
const branchName = process.argv[2];

// Loop through each submodule and switch to branch
submodulePaths.forEach((submodulePath) => {
    console.log(`Switching ${submodulePath} to ${branchName} branch`);
    execSync(`cd ${submodulePath} && git checkout ${branchName} && cd ..`, { stdio: 'inherit' });
});
