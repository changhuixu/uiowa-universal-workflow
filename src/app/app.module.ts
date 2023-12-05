import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SpinnerModule } from '@uiowa/spinner';

import { AppComponent } from './app.component';
import {
  UniversalWorkflowModule,
  WorkflowService,
} from '../../projects/uiowa/universal-workflow/src/public-api';
import { UniversalWorkflowService } from './universal-workflow.service';
import { RoutingHistoryDemoComponent } from './routing-history-demo.component';
import { WorkflowWidgetDemoComponent } from './workflow-widget-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingHistoryDemoComponent,
    WorkflowWidgetDemoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SpinnerModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'routing-history' },
      { path: 'routing-history', component: RoutingHistoryDemoComponent },
      { path: 'workflow-widget', component: WorkflowWidgetDemoComponent },
      { path: '**', redirectTo: '' },
    ]),
    UniversalWorkflowModule,
  ],
  providers: [{ provide: WorkflowService, useClass: UniversalWorkflowService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
