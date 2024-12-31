import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title-page',
  standalone: true,
  imports: [],
  templateUrl: './title-page.component.html',
  styleUrl: './title-page.component.css',
})
export class TitlePageComponent {
  title = input<string>('');
  subtitle = input<string>('');
}
