import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, ComponentRef } from '@angular/core';

export function enableEnvironmentTools<T>(rootComponentRef: ComponentRef<T>): ComponentRef<T> {
    if ('production' === ENV) {
        disableDebugTools();
        enableProdMode();
        return rootComponentRef;
    }

    let ng: NgDebugger = window.ng;

    let componentRef = enableDebugTools(rootComponentRef);

    window.ng.probe = ng.probe;
    window.ng.coreTokens = ng.coreTokens;

    return componentRef;
}

export function enableHotModuleReload<T>(bootloader: () => Promise<ComponentRef<T>>, module: any) {

    if ('development' === ENV && HMR === true) {
        // activate hot module reload
        let ngHmr: HotModuleReplacer = require('angular2-hmr');
        ngHmr.hotModuleReplacement(bootloader, module);
    } else {
        // bootstrap when document is ready
        document.addEventListener('DOMContentLoaded', () => bootloader());
    }
}
