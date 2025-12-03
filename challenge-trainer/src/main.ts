import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// TODO: Re-enable Monaco Editor configuration after fixing build
// Configure Monaco Editor environment
// (window as any).MonacoEnvironment = {
//   getWorkerUrl: function (moduleId: string, label: string) {
//     if (label === 'json') {
//       return './assets/monaco-editor/esm/vs/language/json/json.worker.js';
//     }
//     if (label === 'css' || label === 'scss' || label === 'less') {
//       return './assets/monaco-editor/esm/vs/language/css/css.worker.js';
//     }
//     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//       return './assets/monaco-editor/esm/vs/language/html/html.worker.js';
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return './assets/monaco-editor/esm/vs/language/typescript/ts.worker.js';
//     }
//     return './assets/monaco-editor/esm/vs/editor/editor.worker.js';
//   }
// };

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
