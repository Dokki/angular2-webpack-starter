import { ComponentRef } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { PLATFORM_PROVIDERS } from './platform';
import { AppComponent, APP_PROVIDERS } from './app';

import { enableHotModuleReload, enableEnvironmentTools } from './platform/environment';

export function main(): Promise<ComponentRef<AppComponent>> {

    return bootstrap(AppComponent, [
        ...PLATFORM_PROVIDERS,
        ...APP_PROVIDERS,
    ])
        .then(appRef => enableEnvironmentTools(appRef))
        .catch(err => console.error(err));
}

enableHotModuleReload(main, module);
