export const info = (message?: string, ...optionalParams: unknown[]) => {
    // eslint-disable-next-line no-console
    console.info(message, ...optionalParams);
  };
  
  export const error = (message?: string, ...optionalParams: unknown[]) => {
    // eslint-disable-next-line no-console
    console.error(message, ...optionalParams);
  };
  
  export const debug = (message?: string, ...optionalParams: unknown[]) => {
    // eslint-disable-next-line no-console
    console.debug(message, ...optionalParams);
  };
  
  const withName = (
    name: string,
    logFn: (message?: string, ...optionalParams: unknown[]) => void
  ) => {
    return (message?: string, ...optionalParams: unknown[]) => {
      logFn(`[${name}]: ${message}`, ...optionalParams);
    };
  };
  
  /**
   * Convenience function for server side code.
   *
   * Usage:
   * ```
   * const log = createNamedLoggerFromFilename(__filename);
   * ```
   *
   * See {@link createNamedLogger}
   */
  export const createNamedLoggerFromFilename = (filename: string) => {
    const file = filename.split('/').reverse()[0];
    const loggerName = !file.includes('.js') ? file : file.replace('.js', '');
    return createNamedLogger(loggerName);
  };
  
  /**
   * @param name The name will be pre-prended to each log message so you can easily filter and find logs from this logger
   * @returns logger ob with log functions
   */
  export const createNamedLogger = (name: string) => {
    return {
      info: withName(name, info),
      error: withName(name, error),
      debug: withName(name, debug),
    };
  };

  