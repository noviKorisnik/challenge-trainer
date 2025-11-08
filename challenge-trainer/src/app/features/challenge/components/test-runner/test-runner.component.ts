import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionResult, TestCase } from '../../../../core/models';

@Component({
  selector: 'app-test-runner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-runner.component.html',
  styleUrl: './test-runner.component.scss'
})
export class TestRunnerComponent {
  @Input() testResults: ExecutionResult[] = [];
  @Input() isRunning: boolean = false;
  @Output() runTests = new EventEmitter<void>();

  onRunTests(): void {
    this.runTests.emit();
  }

  get allTestsPassed(): boolean {
    return this.testResults.length > 0 && this.testResults.every(r => r.passed);
  }

  get passedCount(): number {
    return this.testResults.filter(r => r.passed).length;
  }

  formatInput(input: any[]): string {
    return input.map(i => JSON.stringify(i)).join(', ');
  }

  formatOutput(output: any): string {
    return JSON.stringify(output);
  }
}
