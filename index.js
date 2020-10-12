const NpmApi = require('npm-api');
const fs = require('fs');
const npm = new NpmApi();

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function getRepoLine(name, description) {
  const url = `https://www.npmjs.com/package/${name}`;
  return `- [${name}](${url}) : ${description}\n`;
}

async function run() {
  const repos = alphabet.map(letter => npm.repo(letter));
  const descriptions = await Promise.all(repos.map(repo => repo.prop('description')));
  const content = descriptions.reduce((previousContent, description, index) => previousContent + getRepoLine(alphabet[index], description), '');

  fs.writeFileSync('RESULT.md', content);
}

run();