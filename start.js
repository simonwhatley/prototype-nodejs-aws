// Core dependencies
const path = require('path');
const fs = require('fs');

// Warn if node_modules folder doesn't exist
const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'));

if (!nodeModulesExists) {
  console.error('ERROR: Node module folder missing. Try running `npm install`');
  process.exit(0);
}

// Create template .env file if it doesn't exist
const envExists = fs.existsSync(path.join(__dirname, '/.env'));

if (!envExists) {
  console.log('Creating template .env file');
  fs.createWriteStream(path.join(__dirname, '/.env'))
}