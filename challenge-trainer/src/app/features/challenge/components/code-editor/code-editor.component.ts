import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO: Re-enable Monaco Editor after fixing build configuration
// import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
})
export class CodeEditorComponent {
  @Input() code: string = '';
  @Output() codeChange = new EventEmitter<string>();

  onCodeChange(value: string): void {
    this.codeChange.emit(value);
  }
}

