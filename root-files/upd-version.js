/**
 * @params
 * bc - breaking change build
 * m - major build
 * n - minor build // not implemented
 * b - build number only
 */
const fs = require('fs');
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const devEnvFile = fs.readFileSync('./env/dev.env').toString();
const prodEnvFile = fs.readFileSync('./env/prod.env').toString();

const regexBuildNumber = /[BUILD_VERSION=[0-9]+]*$/gm;
const versionString = /VERSION="[0-9]+.[0-9]+.[0-9]+"/gm;
const regexNumber = /[0-9]+/gm; // Note: unstable and Version should always be up in .env

const updateVersion = (name, env) => {
  let file = env;

  if (!argv?.b) {
    /**
     * set Major version or minor
     */
    const currentVersion = file.match(versionString)[0];
    const bc = Number(currentVersion.match(regexNumber)[0]);
    const major = Number(currentVersion.match(regexNumber)[1]);
    const minor = Number(currentVersion.match(regexNumber)[2]);

    file = argv?.m
      ? file.replace(currentVersion, `VERSION="${bc + 1}.${major + 1}"`)
      : file.replace(currentVersion, `VERSION="${bc}.${major}.${minor + 1}"`);
  }
  /**
   * set Build version
   */

  const buildString = file.match(regexBuildNumber)?.[0];
  console.log({buildString});
  file = file.replace(buildString, `BUILD_VERSION=${Number(buildString.match(regexNumber)) + 1}`);

  console.log([
    name,
    file.match(/VERSION="([0-9]+).([0-9]+).([0-9]+)"/gm)[0],
    file.match(/BUILD_VERSION=([0-9]+)/gm)[0],
  ]);

  fs.writeFileSync(`./env/${name}.env`, file);
};

updateVersion('dev', devEnvFile);
updateVersion('prod', prodEnvFile);
