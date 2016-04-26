import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';

// Angular 2 Router
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {RouterActiveDirective} from './router-active';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
    ...ROUTER_DIRECTIVES,

    RouterActiveDirective,
];

export const DIRECTIVES = [
    provide(PLATFORM_DIRECTIVES, { useValue: APPLICATION_DIRECTIVES, multi: true })
];
