/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';


/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    template: `
    <h1>Hello, {{ greeting }}</h1>
  `
})
export class App {
    greeting = 'World';

    constructor() {

    }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
