import { Component, OnInit, ViewChild } from '@angular/core';
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
export class ChallengeContainerComponent implements OnInit {
  @ViewChild(ChallengeGeneratorComponent) generatorComponent!: ChallengeGeneratorComponent;

  activeTab: 'generate' | 'challenge' | 'tests' | 'review' = 'generate';
  leftPanelWidth: number = 500; // Initial width in pixels
  private isDragging = false;
  private startX = 0;
  private startWidth = 0;

  constructor(
    public state: ChallengeStateService,
    private codeExecutor: CodeExecutionService,
    private geminiProvider: GeminiProviderService
  ) {
    // Bind mouse events for dragging
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.onMouseMove.bind(this));
      window.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
  }

  ngOnInit(): void {
    // No initialization needed
  }

  onChallengeGenerated(challenge: Challenge): void {
    this.state.setChallenge(challenge);
    // Auto-switch to challenge tab when new challenge is generated
    this.activeTab = 'challenge';
  }

  quickRegenerate(): void {
    // Re-generate with same parameters by calling the generator component
    if (this.generatorComponent) {
      this.generatorComponent.generateChallenge();
    }
  }

  onDividerMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startWidth = this.leftPanelWidth;
    event.preventDefault();
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.startX;
    const newWidth = this.startWidth + deltaX;

    // Constrain width between 300px and 66% of viewport width
    const maxWidth = window.innerWidth * 0.66;
    this.leftPanelWidth = Math.max(300, Math.min(maxWidth, newWidth));
  }

  private onMouseUp(): void {
    this.isDragging = false;
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
      // Auto-switch to tests tab
      this.activeTab = 'tests';
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
