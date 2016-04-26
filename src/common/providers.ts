import {provide} from 'angular2/core';
import {LocationStrategy, PathLocationStrategy} from 'angular2/platform/common';


// Angular 2
import {FORM_PROVIDERS} from 'angular2/common';
// Angular 2 Http
import {HTTP_PROVIDERS} from 'angular2/http';
// Angular 2 Router
import {ROUTER_PROVIDERS} from 'angular2/router';

export const APPLICATION_PROVIDERS = [
    ...FORM_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,

    provide(LocationStrategy, { useClass: PathLocationStrategy }),
];

export const PROVIDERS = [
    ...APPLICATION_PROVIDERS
];
