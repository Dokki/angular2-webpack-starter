import { Component } from '@angular/core';

require('./app.less');

@Component({
    selector: 'as-app',
    template: `
        <h1>{{ title }}</h1>
    `,
})
export class AppComponent {
    title = 'App here';
}
