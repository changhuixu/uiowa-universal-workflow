import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { WorkflowService } from './workflow.service';

declare global {
  interface Window {
    /**
     * Global WorkflowWidget object
     * https://workflow.uiowa.edu/help/article/36/6
     */
    WorkflowWidget: {
      form_id: number;
      package_id: number;
      signature_id: string;
      scope: string;
      client_id: string;
      environment: string;
      post_sign_void?: string;
      post_version_mismatch?: string;
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
    <div id="workflowWidgetContainer"></div>
  `,
  styles: [],
  standalone: false,
})
export class WorkflowWidgetComponent implements OnInit {
  @Input() packageId = 0;
  @Input() signatureId = '';
  loading = false;

  constructor(private readonly svc: WorkflowService) {}

  ngOnInit(): void {
    this.loading = true;
    this.svc.getWorkflowWidgetConfig().subscribe((c) => {
      window.WorkflowWidget = {
        form_id: c.formId,
        package_id: this.packageId,
        scope: c.scope,
        client_id: c.clientId,
        environment: c.workflowEnvironment,
        signature_id: this.signatureId,
        post_sign_void: '',
        post_version_mismatch: '',
      };
      this.svc
        .lazyLoadWorkflowWidget()
        .pipe(finalize(() => (this.loading = false)))
        .subscribe();
    });
  }
}
