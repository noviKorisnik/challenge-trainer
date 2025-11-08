import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidationResult } from '../../../../core/models';
import { marked } from 'marked';

@Component({
  selector: 'app-validation-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-feedback.component.html',
  styleUrl: './validation-feedback.component.scss'
})
export class ValidationFeedbackComponent {
  private _feedback = signal<ValidationResult | null>(null);
  
  @Input() 
  set feedback(value: ValidationResult) {
    this._feedback.set(value);
  }
  get feedback(): ValidationResult {
    return this._feedback()!;
  }

  feedbackHtml = computed(() => {
    const feedback = this._feedback();
    if (!feedback) return '';
    return this.sanitizer.sanitize(1, marked.parse(feedback.feedback) as string) || '';
  });

  strengthsHtml = computed(() => {
    const feedback = this._feedback();
    if (!feedback?.strengths) return [];
    return feedback.strengths.map((item: string) => 
      this.sanitizer.sanitize(1, marked.parse(item) as string) || ''
    );
  });

  improvementsHtml = computed(() => {
    const feedback = this._feedback();
    if (!feedback?.improvements) return [];
    return feedback.improvements.map((item: string) => 
      this.sanitizer.sanitize(1, marked.parse(item) as string) || ''
    );
  });

  alternativeApproachesHtml = computed(() => {
    const feedback = this._feedback();
    if (!feedback?.alternativeApproaches) return [];
    return feedback.alternativeApproaches.map((item: string) => 
      this.sanitizer.sanitize(1, marked.parse(item) as string) || ''
    );
  });

  constructor(private sanitizer: DomSanitizer) {
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }
}
