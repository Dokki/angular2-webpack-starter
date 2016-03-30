import {ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouterActive} from './router-active';

export const APP_DIRECTIVES = [
    ...ROUTER_DIRECTIVES,
    ...FORM_DIRECTIVES,
    RouterActive,
];
