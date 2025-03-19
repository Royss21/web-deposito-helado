import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-footer-actions',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './footer-actions.component.html',
  styleUrl: './footer-actions.component.css',
  host: {
    class: 'sticky-content flex justify-content-end card gap-2 w-full',
  },
})
export class FooterActionsComponent {
  @HostBinding('class.aditional') isActive = true;
  onCancelButton = output();
  cancelDisabled = input(false);
  saveDisabled = input(false);
  isAtBottom = false;

  constructor() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    this.isActive = !(scrollPosition >= pageHeight - 25);
  }

  onCancel() {
    this.onCancelButton.emit();
  }
}
