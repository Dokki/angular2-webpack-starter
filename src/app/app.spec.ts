import {
    it,
    inject,
    beforeEachProviders,
} from 'angular2/testing';

import {App} from './app.component';

describe('App', () => {
    beforeEachProviders(() => [
        App
    ]);

    it('should have a greeting', inject([ App ], (app) => {
        expect(app.greeting).toEqual('World');
    }));
});
