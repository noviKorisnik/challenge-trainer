import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationResult } from '../../../../core/models';

@Component({
  selector: 'app-validation-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-feedback.component.html',
  styleUrl: './validation-feedback.component.scss'
})
export class ValidationFeedbackComponent {
  @Input() feedback!: ValidationResult;
}
