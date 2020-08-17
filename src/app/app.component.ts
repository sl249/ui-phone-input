import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value: string;
  country: string;
  parsedNumber = '+17163937536';
  isValid: boolean;
}
