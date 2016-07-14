import { BROWSER_PLATFORM_DIRECTIVES } from './directives';
import { BROWSER_PLATFORM_PIPES } from './pipes';
import { BROWSER_PLATFORM_PROVIDERS } from './providers';

export * from './providers';
export * from './directives';
export * from './pipes';

export const PLATFORM_PROVIDERS = [
    ...BROWSER_PLATFORM_DIRECTIVES,
    ...BROWSER_PLATFORM_PIPES,
    ...BROWSER_PLATFORM_PROVIDERS,
]
