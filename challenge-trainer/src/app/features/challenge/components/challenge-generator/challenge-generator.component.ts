import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TOPIC_CATEGORIES } from '../../../../core/constants/topics.const';
import { DIFFICULTIES } from '../../../../core/constants/difficulties.const';
import { ConfigService } from '../../../../core/services/config.service';
import { GeminiProviderService } from '../../../../core/services/gemini-provider.service';
import { Challenge } from '../../../../core/models';

@Component({
  selector: 'app-challenge-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge-generator.component.html',
  styleUrl: './challenge-generator.component.scss'
})
export class ChallengeGeneratorComponent {
  @Output() challengeGenerated = new EventEmitter<Challenge>();
  
  categories = TOPIC_CATEGORIES;
  difficulties = DIFFICULTIES;
  
  selectedCategory = signal<string>('');
  selectedTopic = signal<string>('');
  selectedDifficulty = signal<string>('Easy');
  isGenerating = signal<boolean>(false);
  error = signal<string | null>(null);
  
  availableTopics = signal<string[]>([]);

  constructor(
    private geminiProvider: GeminiProviderService,
    private configService: ConfigService
  ) {
    // Load last selections
    const lastCategory = this.configService.getLastCategory();
    const lastTopic = this.configService.getLastTopic();
    const lastDifficulty = this.configService.getLastDifficulty();
    
    if (lastCategory) {
      this.selectedCategory.set(lastCategory);
      this.onCategoryChange();
    }
    if (lastTopic) {
      this.selectedTopic.set(lastTopic);
    }
    this.selectedDifficulty.set(lastDifficulty);
  }

  onCategoryChange(): void {
    const category = this.categories.find(c => c.category === this.selectedCategory());
    this.availableTopics.set(category?.topics || []);
    this.selectedTopic.set('');
    this.configService.setLastCategory(this.selectedCategory());
  }

  onTopicChange(): void {
    this.configService.setLastTopic(this.selectedTopic());
  }

  onDifficultyChange(): void {
    this.configService.setLastDifficulty(this.selectedDifficulty());
  }

  async generateChallenge(): Promise<void> {
    const category = this.selectedCategory();
    const topic = this.selectedTopic() || category;
    const difficulty = this.selectedDifficulty();

    if (!category) {
      this.error.set('Please select a category');
      return;
    }

    this.isGenerating.set(true);
    this.error.set(null);

    try {
      const challenge = await this.geminiProvider.generateChallenge(topic, difficulty);
      this.challengeGenerated.emit(challenge);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to generate challenge');
    } finally {
      this.isGenerating.set(false);
    }
  }
}
