const NpmApi = require('npm-api');
const fs = require('fs');
const npm = new NpmApi();

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

async function getDescription(packageName) {
  const repo = npm.repo(packageName);
  return repo.prop('description');
}

async function run() {
  const descriptions = await Promise.all(alphabet.map(getDescription));
  const content = descriptions.reduce((previousContent, description, index) => previousContent + `- \`${alphabet[index]}\`: ${description}\n`, '');
  fs.writeFileSync('RESULT.md', content);
}

run();