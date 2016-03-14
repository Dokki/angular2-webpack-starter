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

    constructor() {}
}
