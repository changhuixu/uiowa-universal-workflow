import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { WorkflowService } from './workflow.service';

@Component({
  selector: 'uw-routing-history',
  template: `
    <div class="panel">
      <div class="panel-heading">
        <div>Workflow Routing History</div>
        <div>Package ID #{{ packageId }}</div>
      </div>
      <div class="panel-body">
        @if(loading){
        <div style="height: 20rem">
          <loading-placeholder></loading-placeholder>
        </div>
        } @else {
        <routing-history [attr.history]="history | json"></routing-history>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .panel {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .panel-heading {
        background: #fff4ad;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        font-family: 'Segoe UI', 'Roboto', Arial, Helvetica, sans-serif;
        font-weight: 600;
      }
      .panel-body {
        padding: 1rem;
      }
    `,
  ],
  standalone: false,
})
export class UwRoutingHistoryComponent implements OnInit {
  @Input() packageId = 0;
  loading = false;
  history = '';

  constructor(private readonly svc: WorkflowService) {}

  ngOnInit(): void {
    this.loading = true;
    this.svc.lazyLoadHistoryWidget().subscribe((_) => {
      this.svc
        .getPackageRoutingHistory(this.packageId || 0)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((x) => (this.history = x));
    });
  }
}
