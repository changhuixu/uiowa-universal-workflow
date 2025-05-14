import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { WorkflowService } from './workflow.service';

declare function formatWorkflowHistory(
  workflowPath: string,
  package_id: number
): string;

@Component({
  selector: 'uw-routing-history',
  template: `
    @if(loading){
    <div style="height: 20rem">
      <loading-placeholder></loading-placeholder>
    </div>
    } @else {
    <div id="routingHistory" [innerHtml]="routingHistoryString"></div>
    }
  `,
  styles: [],
  standalone: false,
})
export class UwRoutingHistoryComponent implements OnInit {
  @Input() packageId = 0;
  loading = false;
  routingHistoryString = '';

  constructor(private readonly svc: WorkflowService) {}

  ngOnInit(): void {
    this.loading = true;
    this.svc.lazyLoadHistoryWidget().subscribe((_) => {
      this.svc
        .getPackageRoutingHistory(this.packageId || 0)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((x) => {
          this.routingHistoryString = formatWorkflowHistory(
            x,
            this.packageId || 0
          );
        });
    });
  }
}
