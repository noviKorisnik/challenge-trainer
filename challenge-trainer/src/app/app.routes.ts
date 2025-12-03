import { Routes } from '@angular/router';
import { ChallengeContainerComponent } from './features/challenge/components/challenge-container/challenge-container.component';


export const routes: Routes = [
  {
    path: '',
    component: ChallengeContainerComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
