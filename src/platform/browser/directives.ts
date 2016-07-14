import { PLATFORM_DIRECTIVES } from '@angular/core';

// Angular 2 Router
import { FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
    ...FORM_DIRECTIVES,
    ...ROUTER_DIRECTIVES,
];

export const BROWSER_PLATFORM_DIRECTIVES = [
    { provide: PLATFORM_DIRECTIVES,  useValue: APPLICATION_DIRECTIVES, multi: true },
];
