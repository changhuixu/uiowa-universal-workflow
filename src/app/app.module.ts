import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SpinnerModule } from '@uiowa/spinner';

import {
  UniversalWorkflowModule,
  WorkflowService,
} from '../../projects/uiowa/universal-workflow/src/public-api';
import { AppComponent } from './app.component';
import { RoutingHistoryDemoComponent } from './routing-history-demo.component';
import { UniversalWorkflowService } from './universal-workflow.service';
import { WorkflowWidgetDemoComponent } from './workflow-widget-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingHistoryDemoComponent,
    WorkflowWidgetDemoComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    SpinnerModule,
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'routing-history' },
        { path: 'routing-history', component: RoutingHistoryDemoComponent },
        { path: 'workflow-widget', component: WorkflowWidgetDemoComponent },
        { path: '**', redirectTo: '' },
      ],
      { useHash: true }
    ),
    UniversalWorkflowModule,
  ],
  providers: [
    { provide: WorkflowService, useClass: UniversalWorkflowService },
    provideHttpClient(),
  ],
})
export class AppModule {}
