import { Injectable } from '@angular/core';
import { Challenge, ValidationResult, ExecutionResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export abstract class AiProviderService {
  abstract generateChallenge(topic: string, difficulty: string): Promise<Challenge>;
  abstract validateSolution(challenge: Challenge, code: string, testResults: ExecutionResult[]): Promise<ValidationResult>;
}
