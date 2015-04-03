// logrw must be instantiated, during this timestamps can be enabled by passing
// true as a parameter.
var logrw = new (require('./logrw'))(true);

logrw.informational(
    'Messages can be any data type and multiple arguments may be passed.',
    'Each argument will be processed by util.inspect apart from strings');
logrw.info('info() is an alias for informational()');
logrw.info('warn() is an alias for warning()');
logrw.info('ok() is an alias for notice()');
logrw.info('rw() is an alias for update()');

logrw.emergency('RFC 5424 Severity Level 0', 'system is unusable');

logrw.alert('RFC 5424 Severity Level 1', 'action must be taken immediately');

logrw.critical('RFC 5424 Severity Level 2', 'critical conditions');

logrw.error('RFC 5424 Severity Level 3', 'error conditions');

logrw.warning('RFC 5424 Severity Level 4', 'warning conditions');

logrw.notice('RFC 5424 Severity Level 5', 'normal but significant condition');

logrw.informational('RFC 5424 Severity Level 6', 'informational messages');

logrw.debug('RFC 5424 Severity Level 7', 'debug-level messages');

logrw.info('This line will be updated in 5 seconds');

setTimeout(function () {
    'use strict';
    logrw.update().ok('Line updated');
}, 5000);