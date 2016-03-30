import {ComponentRef} from 'angular2/core';

export namespace AppRef {
    var appRef: ComponentRef = null;

    export function register(ref: ComponentRef) {
        if (!appRef) {
            appRef = ref;
        }
    }

    export function getRef(): ComponentRef {
        return appRef;
    }
}
