import {
    it,
    inject,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {App} from './app.component';

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        App
    ]);

    it('should have a greeting', inject([ App ], (app) => {
        expect(app.greeting).toEqual('World');
    }));
});
