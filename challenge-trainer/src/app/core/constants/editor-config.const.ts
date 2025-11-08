export interface EditorConfig {
  theme: 'vs-dark' | 'vs-light' | 'hc-black';
  fontSize: number;
  lineNumbers: 'on' | 'off' | 'relative';
  minimap: { enabled: boolean };
  wordWrap: 'on' | 'off';
  tabSize: number;
  autoClosingBrackets: 'always' | 'languageDefined' | 'beforeWhitespace' | 'never';
  formatOnPaste: boolean;
  formatOnType: boolean;
}

export const DEFAULT_EDITOR_CONFIG: EditorConfig = {
  theme: 'vs-dark',
  fontSize: 14,
  lineNumbers: 'on',
  minimap: { enabled: false },
  wordWrap: 'off',
  tabSize: 2,
  autoClosingBrackets: 'always',
  formatOnPaste: true,
  formatOnType: true
};
