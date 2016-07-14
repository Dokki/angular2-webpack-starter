import { PLATFORM_PIPES, Pipe, PipeTransform } from '@angular/core';
import { isPresent } from '@angular/core/src/facade/lang';

// application_pipes: pipes that are global through out the application
export const APPLICATION_PIPES = [
];

export const BROWSER_PLATFORM_PIPES = [
    { provide: PLATFORM_PIPES, multi: true, useValue: APPLICATION_PIPES },
];
