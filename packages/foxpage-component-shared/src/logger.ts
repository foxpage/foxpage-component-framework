import chalk, { Color } from 'chalk';
import { format } from 'util';
import _debug from 'debug';
import logSymbols from 'log-symbols';

const debug = _debug('foxpage');

function prefix(level: string) {
  return `${level}: `;
}

export class Logger {
  error(msg: string, ...args: any[]) {
    const f = prefix('Error') + format(msg, ...args);
    console.error(logSymbols.error, chalk.red(f));
  }
  warn(msg: string, ...args: any[]) {
    const f = prefix('Warn') + format(msg, ...args);
    console.warn(logSymbols.warning, chalk.yellow(f));
  }
  info(msg: string, ...args: any[]) {
    const f = prefix('Info') + format(msg, ...args);
    console.log(logSymbols.info, chalk.blueBright(f));
  }
  success(msg: string, ...args: any[]) {
    const f = prefix('Success') + format(msg, ...args);
    console.log(logSymbols.success, chalk.blueBright(f));
  }
  debug(msg: string, ...args: any[]) {
    const m = format(msg, ...args);
    debug(m);
  }
  colorLog(color: typeof Color, msg: string, ...args: any[]) {
    const f = prefix('Log') + format(msg, ...args);
    console.log(chalk[color](f));
  }
}

export const logger = new Logger();
