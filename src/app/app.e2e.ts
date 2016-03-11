/*
 * TODO: ES5 for now until I make a webpack plugin for protractor
 */
describe('App', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should have a title', () => {
        let subject = browser.getTitle();
        let result  = 'Angular 2 webpack starter';
        expect(subject).toEqual(result);
    });

    it('should have <h1>', () => {
        let subject = element(by.css('app h1')).isPresent();
        let result  = true;
        expect(subject).toEqual(result);
    });

});
