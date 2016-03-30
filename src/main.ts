import {PLATFORM_DIRECTIVES, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {App} from './app/app';
import {AppRef} from './app/util/appref';
import {APP_PROVIDERS, APP_DIRECTIVES} from './common';

export function main() {
    return bootstrap(App, [
        ...APP_PROVIDERS,
        provide(PLATFORM_DIRECTIVES, { useValue: APP_DIRECTIVES, multi: true }),
    ])
        .then(appRef => AppRef.register(appRef))
        .catch(err => console.error(err));
}


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */

function bootstrapDomReady() {
    // bootstrap after document is ready
    return document.addEventListener('DOMContentLoaded', main);
}

if ('development' === process.env.ENV) {
    // activate hot module reload
    if (process.env.HMR) {
        if (document.readyState === 'complete') {
            main();
        } else {
            bootstrapDomReady();
        }
        module.hot.accept();
    } else {
        bootstrapDomReady();
    }
} else {
    bootstrapDomReady();
}
