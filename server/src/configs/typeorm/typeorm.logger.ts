import { Logger as TypeOrmLogger } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Logger } from '@nestjs/common';

export class DatabaseLogger implements TypeOrmLogger {
  private logger;

  private options: LoggerOptions;

  constructor(options?: LoggerOptions) {
    this.logger = new Logger(DatabaseLogger.name);
    this.options = options;
  }

  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[]) {
    if (
      this.options === 'all' ||
      this.options === true ||
      (this.options instanceof Array && this.options.indexOf('query') !== -1)
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
          : '');
      this.logger.log(`Query ${sql}`);
    }
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(error: string, query: string, parameters?: any[]) {
    if (
      this.options === 'all' ||
      this.options === true ||
      (this.options instanceof Array && this.options.indexOf('error') !== -1)
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
          : '');
      this.logger.error(`Query failed: ` + sql);
      this.logger.error(`Error:`, error);
    }
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[]) {
    const sql =
      query +
      (parameters && parameters.length
        ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
        : '');
    this.logger.warn(`Detected query slow |${time}| ${sql} `);
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string) {
    if (
      this.options === 'all' ||
      (this.options instanceof Array && this.options.indexOf('schema') !== -1)
    ) {
      this.logger.log(message);
    }
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string) {
    this.logger.log(message);
  }

  /**
   * Perform logging using given logger, or by default to the this.logger.
   * Log has its own level and message.
   */
  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
        if (
          this.options === 'all' ||
          (this.options instanceof Array && this.options.indexOf('log') !== -1)
        )
          this.logger.log(message);
        break;
      case 'info':
        if (
          this.options === 'all' ||
          (this.options instanceof Array && this.options.indexOf('info') !== -1)
        )
          this.logger.debug(message);
        break;
      case 'warn':
        if (
          this.options === 'all' ||
          (this.options instanceof Array && this.options.indexOf('warn') !== -1)
        )
          this.logger.warn(message);
        break;
    }
  }

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}
