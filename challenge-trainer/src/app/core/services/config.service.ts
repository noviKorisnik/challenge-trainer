import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants/storage-keys.const';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private storage: StorageService) {}

  getApiKey(): string | null {
    return this.storage.get<string>(STORAGE_KEYS.API_KEY);
  }

  setApiKey(apiKey: string): void {
    this.storage.set(STORAGE_KEYS.API_KEY, apiKey);
  }

  clearApiKey(): void {
    this.storage.remove(STORAGE_KEYS.API_KEY);
  }

  hasApiKey(): boolean {
    return !!this.getApiKey();
  }

  getLastTopic(): string | null {
    return this.storage.get<string>(STORAGE_KEYS.LAST_TOPIC);
  }

  setLastTopic(topic: string): void {
    this.storage.set(STORAGE_KEYS.LAST_TOPIC, topic);
  }

  getLastCategory(): string | null {
    return this.storage.get<string>(STORAGE_KEYS.LAST_CATEGORY);
  }

  setLastCategory(category: string): void {
    this.storage.set(STORAGE_KEYS.LAST_CATEGORY, category);
  }

  getLastDifficulty(): string {
    return this.storage.get<string>(STORAGE_KEYS.LAST_DIFFICULTY) || 'Easy';
  }

  setLastDifficulty(difficulty: string): void {
    this.storage.set(STORAGE_KEYS.LAST_DIFFICULTY, difficulty);
  }
}
