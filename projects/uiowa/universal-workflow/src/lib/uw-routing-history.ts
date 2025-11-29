import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingPlaceholder } from './loading-placeholder';
import { WorkflowService } from './workflow.service';

@Component({
  selector: 'uw-routing-history',
  imports: [JsonPipe, LoadingPlaceholder],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="panel">
      <div class="panel-heading">
        <div>Workflow Routing History</div>
        <div>Package ID #{{ packageId() }}</div>
      </div>
      <div class="panel-body">
        @if(loading()){
        <div style="height: 20rem"><loading-placeholder /></div>
        } @else {
        <routing-history [attr.history]="history() | json"></routing-history>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwRoutingHistory implements OnInit {
  packageId = input<number>(0);
  loading = signal(true);
  history = signal('');

  constructor(private readonly svc: WorkflowService) {}

  ngOnInit(): void {
    this.svc.lazyLoadHistoryWidget().subscribe((_) => {
      this.svc
        .getPackageRoutingHistory(this.packageId() || 0)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe((x) => this.history.set(x));
    });
  }
}
