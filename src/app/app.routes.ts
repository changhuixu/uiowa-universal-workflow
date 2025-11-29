import { Routes } from '@angular/router';
import { RoutingHistoryDemo } from './routing-history-demo';
import { WorkflowWidgetDemo } from './workflow-widget-demo';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'routing-history' },
  { path: 'routing-history', component: RoutingHistoryDemo },
  { path: 'workflow-widget', component: WorkflowWidgetDemo },
  { path: '**', redirectTo: '' },
];
