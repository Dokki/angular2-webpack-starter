import {bootstrap} from 'angular2/platform/browser';

import {DIRECTIVES, PROVIDERS, ENV_PROVIDERS} from './platform';

import {App, AppRef} from './app';

export function main(initialHmrState?: any): Promise<any> {

    return bootstrap(App, [
        ...ENV_PROVIDERS,
        ...PROVIDERS,
        ...DIRECTIVES,
    ])
        .then(appRef => AppRef.register(appRef))
        .catch(err => console.error(err));
}


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
    // activate hot module reload
    let ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
} else {
    // bootstrap when documetn is ready
    document.addEventListener('DOMContentLoaded', () => main());
}
