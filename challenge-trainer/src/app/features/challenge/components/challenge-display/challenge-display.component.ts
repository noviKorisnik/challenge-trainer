import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Challenge } from '../../../../core/models';
import { marked } from 'marked';

@Component({
  selector: 'app-challenge-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-display.component.html',
  styleUrl: './challenge-display.component.scss'
})
export class ChallengeDisplayComponent {
  private _challenge = signal<Challenge | null>(null);
  
  @Input() 
  set challenge(value: Challenge) {
    this._challenge.set(value);
  }
  get challenge(): Challenge {
    return this._challenge()!;
  }

  descriptionHtml = computed(() => {
    const challenge = this._challenge();
    if (!challenge) return '';
    return this.sanitizer.sanitize(1, marked.parse(challenge.description) as string) || '';
  });

  constructor(private sanitizer: DomSanitizer) {
    // Configure marked options for better code block rendering
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }
}
