var chalk = require('chalk'),
    util = require('util');

/**
 * Left pad a number if it is less than 10.
 *
 * @param {number} number - The number to left pad.
 * @returns {string}
 */
var lpad = function (number) {
    'use strict';
    return number < 10 ? '0' + number : number;
};

/**
 * Generate a timestamp string
 *
 * @returns {string}
 */
var getTimeString = function () {
    'use strict';
    var date = new Date();
    var dateString = [
        date.getHours(),
        lpad(date.getMinutes()),
        lpad(date.getSeconds())].join(':');
    return chalk.grey(chalk.white('[') + dateString + chalk.white(']'));
};

/**
 * Logrw - A simple colourful and updatable logger.
 *
 * @param {boolean} [showTime] - Enable timestamps on output
 * @constructor
 */
var Logrw = function (showTime) {
    'use strict';
    this.showTime = showTime;
};

/**
 * Print a message to stdout
 *
 * @param {String} prefix - The severity identifier
 * @param {Arguments} args - The arguments to display as a message
 * @private
 */
Logrw.prototype._print = function (prefix, args) {
    'use strict';
    var output = '';
    var finalMessages = [];
    var messages = Array.prototype.slice.call(args);

    messages.forEach(function (message) {
        if (typeof message === 'string') {
            finalMessages.push(message);
            return;
        }
        finalMessages.push(util.inspect(message));
    });

    if (this.showTime) {
        output = util.format(
            '%s %s %s\u001b[K\n',
            getTimeString(),
            prefix, finalMessages.join(' ')
        );
    } else {
        output = util.format(
            '%s %s\n\u001b[K',
            prefix,
            finalMessages.join(' ')
        );
    }
    process.stdout.write(output);
};

/**
 * Display an emergency message
 *
 * RFC 5424 Severity Level 0
 * Emergency: system is unusable
 *
 * @param {...*} arguments - The message to display
 */
Logrw.prototype.emergency = function () {
    'use strict';
    this._print(chalk.bgRed.white.underline('EMERGENCY'), arguments)
};

/**
 * Display an alert message
 *
 * RFC 5424 Severity Level 1
 * Alert: action must be taken immediately
 *
 * @param {...*} arguments - The message to display
 */
Logrw.prototype.alert = function () {
    'use strict';
    this._print(chalk.bgRed.white('ALERT'), arguments)
};

/**
 * Display a critical message
 *
 * RFC 5424 Severity Level 2
 * Critical: critical conditions
 *
 * @param {...*} arguments - The message to display
 */
Logrw.prototype.critical = function () {
    'use strict';
    this._print(chalk.red.underline('CRITICAL'), arguments)
};

/**
 * Display an error message
 *
 * RFC 5424 Severity Level 3
 * Error: error conditions
 *
 * @param {...*} arguments - The message to display
 */
Logrw.prototype.error = function () {
    'use strict';
    this._print(chalk.red('ERROR'), arguments)
};

/**
 * Display a warning message
 *
 * RFC 5424 Severity Level 4
 * Warning: warning conditions
 *
 * @param {...*} arguments - The message to display
 */
Logrw.prototype.warn = Logrw.prototype.warning = function () {
    'use strict';
    this._print(chalk.yellow('WARNING'), arguments)
};

/**
 * Display a notice message
 *
 * RFC 5424 Severity Level 5
 * Notice: normal but significant condition
 *
 * @param {...*} arguments - The message to display
 */
Logrw.prototype.ok = Logrw.prototype.notice = function () {
    'use strict';
    this._print(chalk.green('OK'), arguments)
};

/**
 * Display an informational message
 *
 * RFC 5424 Severity Level 6
 * Informational: informational messages
 *
 * @param {...*} arguments - The message to display
 */
Logrw.prototype.info = Logrw.prototype.informational = function () {
    'use strict';
    this._print(chalk.cyan('INFO'), arguments)
};

/**
 * Display a debug message
 *
 * RFC 5424 Severity Level 7
 * Debug: debug-level messages
 *
 * @param {...*} arguments - The message to display
 */
Logrw.prototype.debug = function () {
    'use strict';
    this._print(chalk.gray('DEBUG'), arguments)
};

/**
 * Move the cursor to the previous line.
 *
 * Subsequent output will replace the contents.
 *
 * @return {Logrw}
 */
Logrw.prototype.rw = Logrw.prototype.update = function () {
    'use strict';
    process.stdout.write('\u001b[1A');
    return this;
};

module.exports = Logrw;
