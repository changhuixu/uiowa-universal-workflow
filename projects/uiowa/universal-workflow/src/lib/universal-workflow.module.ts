import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@uiowa/spinner';
import { WorkflowWidgetComponent } from './workflow-widget.component';
import { UwRoutingHistoryComponent } from './uw-routing-history.component';

@NgModule({
  declarations: [WorkflowWidgetComponent, UwRoutingHistoryComponent],
  imports: [CommonModule, SpinnerModule],
  exports: [WorkflowWidgetComponent, UwRoutingHistoryComponent],
})
export class UniversalWorkflowModule {}
