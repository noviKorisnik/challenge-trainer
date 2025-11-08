import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeGeneratorComponent } from '../challenge-generator/challenge-generator.component';
import { ChallengeDisplayComponent } from '../challenge-display/challenge-display.component';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { TestRunnerComponent } from '../test-runner/test-runner.component';
import { ValidationFeedbackComponent } from '../validation-feedback/validation-feedback.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorDisplayComponent } from '../../../../shared/components/error-display/error-display.component';
import { ChallengeStateService } from '../../services/challenge-state.service';
import { CodeExecutionService } from '../../../../core/services/code-execution.service';
import { GeminiProviderService } from '../../../../core/services/gemini-provider.service';
import { Challenge } from '../../../../core/models';

@Component({
  selector: 'app-challenge-container',
  standalone: true,
  imports: [
    CommonModule,
    ChallengeGeneratorComponent,
    ChallengeDisplayComponent,
    CodeEditorComponent,
    TestRunnerComponent,
    ValidationFeedbackComponent,
    LoadingSpinnerComponent,
    ErrorDisplayComponent
  ],
  templateUrl: './challenge-container.component.html',
  styleUrl: './challenge-container.component.scss'
})
export class ChallengeContainerComponent {
  activeTab: 'description' | 'review' = 'description';

  constructor(
    public state: ChallengeStateService,
    private codeExecutor: CodeExecutionService,
    private geminiProvider: GeminiProviderService
  ) {}

  onChallengeGenerated(challenge: Challenge): void {
    this.state.setChallenge(challenge);
    // Reset to description tab when new challenge is generated
    this.activeTab = 'description';
  }

  onCodeChange(code: string): void {
    this.state.setUserCode(code);
  }

  runTests(): void {
    const code = this.state.userCode();
    const challenge = this.state.currentChallenge();
    
    if (!challenge) return;

    try {
      const results = this.codeExecutor.executeCode(code, challenge.testCases);
      this.state.setTestResults(results);
    } catch (error: any) {
      this.state.setError(error.message || 'Failed to run tests');
    }
  }

  async submitForReview(): Promise<void> {
    const code = this.state.userCode();
    const challenge = this.state.currentChallenge();
    const testResults = this.state.testResults();
    
    if (!challenge) return;

    this.state.setValidating(true);
    this.state.setError(null);

    try {
      const feedback = await this.geminiProvider.validateSolution(challenge, code, testResults);
      this.state.setValidationFeedback(feedback);
      // Auto-switch to review tab
      this.activeTab = 'review';
    } catch (error: any) {
      this.state.setError(error.message || 'Failed to validate solution');
    } finally {
      this.state.setValidating(false);
    }
  }

  get allTestsPassed(): boolean {
    const results = this.state.testResults();
    return results.length > 0 && results.every(r => r.passed);
  }
}
