import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    template: `
        <h1>Hello, {{ greeting }}</h1>
    `,
})
export class App {
    greeting = 'World';
}
