import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { disableDeprecatedForms, provideForms, FORM_PROVIDERS } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';

export const APPLICATION_PROVIDERS = [
    disableDeprecatedForms(),
    provideForms(),
    ...FORM_PROVIDERS,
    ...HTTP_PROVIDERS,

    { provide: LocationStrategy, useClass: PathLocationStrategy },
];

export const BROWSER_PLATFORM_PROVIDERS = [
    ...APPLICATION_PROVIDERS,
];
