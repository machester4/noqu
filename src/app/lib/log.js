const chalk = require("chalk");
const log = console.log;

// Colors
const info = chalk.cyan;
const success = chalk.green;
const warn = chalk.keyword("orange");
const error = chalk.bold.red;

module.exports = {
  info(text) {
    log(info(text));
  },
  success(text) {
    log(success(text));
  },
  warn(text) {
    log(warn(text));
  },
  error(text) {
    log(error(text));
  }
};
