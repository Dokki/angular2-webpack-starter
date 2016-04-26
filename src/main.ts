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

if ('development' === ENV && HMR === true) {
    if (document.readyState === 'complete') {
        main();
    } else {
        document.addEventListener('DOMContentLoaded', () => main());
    }
    module.hot.accept();
} else {
    document.addEventListener('DOMContentLoaded', () => main());
}
