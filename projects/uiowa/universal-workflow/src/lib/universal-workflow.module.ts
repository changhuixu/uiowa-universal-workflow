import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@uiowa/spinner';
import { UwRoutingHistoryComponent } from './uw-routing-history.component';
import { WorkflowWidgetComponent } from './workflow-widget.component';

@NgModule({
  declarations: [WorkflowWidgetComponent, UwRoutingHistoryComponent],
  imports: [CommonModule, SpinnerModule],
  exports: [WorkflowWidgetComponent, UwRoutingHistoryComponent],
})
export class UniversalWorkflowModule {}
