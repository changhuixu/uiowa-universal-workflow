import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { WorkflowService } from './workflow.service';

declare global {
  interface Window {
    /**
     * Global WorkflowWidget object
     * https://docs.ais.its.uiowa.edu/workflow/widget.html
     */
    WorkflowWidget: {
      package_id: number;
      client_id: string;
    };
  }
}

@Component({
  selector: 'workflow-widget',
  template: `
    @if(loading){
    <div style="height: 20rem">
      <loading-placeholder></loading-placeholder>
    </div>
    }
    <div id="widgetContainer"></div>
  `,
  styles: [],
  standalone: false,
})
export class WorkflowWidgetComponent implements OnInit {
  @Input() packageId = 0;
  loading = false;

  constructor(private readonly svc: WorkflowService) {}

  ngOnInit(): void {
    this.loading = true;
    this.svc.getWorkflowWidgetConfig().subscribe((c) => {
      window.WorkflowWidget = {
        package_id: this.packageId,
        client_id: c.clientId,
      };
      this.svc
        .lazyLoadWorkflowWidget()
        .pipe(finalize(() => (this.loading = false)))
        .subscribe();
    });
  }
}
