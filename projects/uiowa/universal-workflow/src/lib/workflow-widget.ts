import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingPlaceholder } from './loading-placeholder';
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
  imports: [LoadingPlaceholder],
  template: `
    @if(loading()){
    <div style="height: 20rem"><loading-placeholder /></div>
    }
    <div id="widgetContainer"></div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowWidget implements OnInit {
  packageId = input<number>(0);
  loading = signal(true);

  constructor(private readonly svc: WorkflowService) {}

  ngOnInit(): void {
    this.svc.getWorkflowWidgetConfig().subscribe((c) => {
      window.WorkflowWidget = {
        package_id: this.packageId(),
        client_id: c.clientId,
      };
      this.svc
        .lazyLoadWorkflowWidget()
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe();
    });
  }
}
