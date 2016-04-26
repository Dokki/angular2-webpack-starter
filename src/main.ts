import {bootstrap} from 'angular2/platform/browser';

import {PROVIDERS, ENV_PROVIDERS, DIRECTIVES, PIPES} from './common';

import {App, AppRef} from './app';

export function main(): Promise<any> {

    return bootstrap(App, [
        ...ENV_PROVIDERS,
        ...PROVIDERS,
        ...DIRECTIVES,
        ...PIPES,
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
    if (document.readyState === 'complete') {
        main();
    } else {
        document.addEventListener('DOMContentLoaded', () => main());
    }
    module.hot.accept();
} else {
    // bootstrap when documetn is ready
    document.addEventListener('DOMContentLoaded', () => main());
}
