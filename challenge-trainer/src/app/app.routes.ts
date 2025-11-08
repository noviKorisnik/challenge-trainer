import { Routes } from '@angular/router';
import { ChallengeContainerComponent } from './features/challenge/components/challenge-container/challenge-container.component';
import { ApiConfigComponent } from './features/settings/components/api-config/api-config.component';

export const routes: Routes = [
  {
    path: '',
    component: ChallengeContainerComponent
  },
  {
    path: 'settings',
    component: ApiConfigComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
