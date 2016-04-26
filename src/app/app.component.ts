import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';

@Component({
    selector: 'app',
    template: `
        <h1>Hello, {{ greeting }}</h1>
    `,
})
export class App {
    greeting = 'World';
}
