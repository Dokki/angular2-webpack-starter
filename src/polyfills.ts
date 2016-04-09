import 'core-js';
import 'zone.js/dist/zone';

if ('production' === ENV) {
    // Production
} else {
    // Development
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
