import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Challenge } from '../../../../core/models';

@Component({
  selector: 'app-challenge-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-display.component.html',
  styleUrl: './challenge-display.component.scss'
})
export class ChallengeDisplayComponent {
  @Input() challenge!: Challenge;
}
