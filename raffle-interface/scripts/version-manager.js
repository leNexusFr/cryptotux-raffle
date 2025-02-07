const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const updateVersion = () => {
  const packagePath = path.join(__dirname, '../package.json');
  const pkg = require(packagePath);
  
  // Incrémenter la version patch
  const [major, minor, patch] = pkg.version.split('.');
  pkg.version = `${major}.${minor}.${parseInt(patch) + 1}`;
  
  // Mettre à jour package.json
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  
  // Mettre à jour TERMS.md via le script existant
  require('./update-terms');
  
  console.log(`✅ Version updated to ${pkg.version}`);
  
  // Créer un commit Git
  try {
    execSync('git add package.json TERMS.md');
    execSync(`git commit -m "chore: bump version to ${pkg.version}"`);
    console.log('✅ Git commit created');
  } catch (error) {
    console.error('❌ Git commit failed:', error.message);
  }
};

updateVersion();