import {enableProdMode, provide} from 'angular2/core';
import {ELEMENT_PROBE_PROVIDERS_PROD_MODE, ELEMENT_PROBE_PROVIDERS} from 'angular2/src/platform/dom/debug/ng_probe';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, PathLocationStrategy, LocationStrategy} from 'angular2/router';

const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
    enableProdMode();
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS_PROD_MODE);
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

export const APP_PROVIDERS = [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,

    provide(LocationStrategy, { useClass: PathLocationStrategy }),
];
