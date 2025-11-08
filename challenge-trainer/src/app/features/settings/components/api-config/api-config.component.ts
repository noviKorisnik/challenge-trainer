import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../../../core/services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api-config.component.html',
  styleUrl: './api-config.component.scss'
})
export class ApiConfigComponent {
  apiKeySaved = output<void>();
  apiKey = signal<string>('');
  message = signal<string>('');
  messageType = signal<'success' | 'error' | ''>('');

  constructor(
    private configService: ConfigService,
    private router: Router
  ) {
    const existingKey = this.configService.getApiKey();
    if (existingKey) {
      this.apiKey.set(existingKey);
    }
  }

  saveApiKey(): void {
    const key = this.apiKey().trim();
    
    if (!key) {
      this.showMessage('Please enter a valid API key', 'error');
      return;
    }

    if (key.length < 20) {
      this.showMessage('API key seems too short', 'error');
      return;
    }

    this.configService.setApiKey(key);
    this.showMessage('API key saved successfully! You can now generate challenges.', 'success');
    this.apiKeySaved.emit();
  }

  clearApiKey(): void {
    this.configService.clearApiKey();
    this.apiKey.set('');
    this.showMessage('API key cleared', 'success');
    this.apiKeySaved.emit();
  }

  private showMessage(text: string, type: 'success' | 'error'): void {
    this.message.set(text);
    this.messageType.set(type);
    setTimeout(() => {
      this.message.set('');
      this.messageType.set('');
    }, 3000);
  }
}
