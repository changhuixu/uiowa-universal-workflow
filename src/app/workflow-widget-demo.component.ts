import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, of, finalize } from 'rxjs';
import { DataService } from './data.service';
import { WorkflowAllowedActions } from 'projects/uiowa/universal-workflow/src/public-api';

@Component({
  selector: 'app-workflow-widget-demo',
  template: `
    <div
      *ngIf="loading"
      class="d-flex justify-content-center align-items-center my-5"
    >
      <uiowa-ring></uiowa-ring>
    </div>

    <ng-container *ngIf="!loading">
      <ng-container *ngIf="dataRows; else noResult">
        <div>
          <div *ngFor="let item of dataRows">{{ item }}</div>
        </div>

        <ng-container *ngIf="uwPermissions?.canSign; else history">
          <workflow-widget
            [packageId]="packageId"
            [signatureId]="signatureId"
          ></workflow-widget>
        </ng-container>
      </ng-container>

      <ng-template #noResult>
        <div class="alert alert-danger my-3" role="alert">
          <p *ngIf="!packageId">
            Please provide a Workflow PackageID. You may want to navigate from
            your workflow inbox to this website.
          </p>
          <p *ngIf="packageId">
            The Universal Workflow package ID "{{ packageId }}" is invalid or
            you don't have enough permissions to view this workflow package.
          </p>
        </div>
      </ng-template>

      <ng-template #history>
        <uw-routing-history [packageId]="packageId"></uw-routing-history>
      </ng-template>
    </ng-container>
  `,
  styles: [],
})
export class WorkflowWidgetDemoComponent implements OnInit {
  formId = '';
  packageId = 0;
  signatureId = '';
  loading = false;
  dataRows: string[] = [];
  uwPermissions: WorkflowAllowedActions | null = null;

  constructor(private route: ActivatedRoute, private svc: DataService) {}

  // the URL follows the pattern: workflow?formId=15390&packageId=13212150&signatureId=6019369
  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((params: ParamMap) => {
          if (!params) {
            return of(null);
          }
          this.formId = params.get('formId') || '';
          this.packageId = +(params.get('packageId') || '');
          this.signatureId = params.get('signatureId') || '';
          if (!this.packageId) {
            return of(null);
          }

          this.loading = true;
          return this.svc
            .getMyForm(this.packageId)
            .pipe(finalize(() => (this.loading = false)));
        })
      )
      .subscribe((x) => {
        if (x) {
          this.dataRows = x.data;
          this.uwPermissions = x.permissions;
        }
      });
  }
}
