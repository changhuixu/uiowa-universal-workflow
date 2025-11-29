import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { WorkflowService } from '../../projects/uiowa/universal-workflow/src/public-api';
import { routes } from './app.routes';
import { UniversalWorkflowService } from './universal-workflow.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    { provide: WorkflowService, useClass: UniversalWorkflowService },
  ],
};
