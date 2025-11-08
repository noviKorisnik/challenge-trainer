import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
})
export class CodeEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;
  @Input() code: string = '';
  @Output() codeChange = new EventEmitter<string>();

  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private isUpdating = false;

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  private initializeEditor(): void {
    if (!this.editorContainer) return;

    // Configure Monaco theme
    monaco.editor.defineTheme('challenge-trainer-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0b1220',
        'editor.foreground': '#e6eef8',
        'editorLineNumber.foreground': '#93a3b8',
        'editorCursor.foreground': '#4f9dff',
        'editor.selectionBackground': '#2d4a6d',
        'editor.lineHighlightBackground': '#1a2332',
      }
    });

    // Create editor instance
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.code,
      language: 'javascript',
      theme: 'challenge-trainer-dark',
      automaticLayout: true,
      fontSize: 14,
      fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      roundedSelection: false,
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
      bracketPairColorization: {
        enabled: true
      },
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
    });

    // Listen to content changes
    this.editor.onDidChangeModelContent(() => {
      if (!this.isUpdating && this.editor) {
        const value = this.editor.getValue();
        this.codeChange.emit(value);
      }
    });
  }

  // Update editor content when @Input changes
  ngOnChanges(): void {
    if (this.editor && this.code !== this.editor.getValue()) {
      this.isUpdating = true;
      this.editor.setValue(this.code);
      this.isUpdating = false;
    }
  }
}

