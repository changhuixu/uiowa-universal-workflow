import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { finalize, of, switchMap } from 'rxjs';
import { WorkflowAllowedActions } from '../../projects/uiowa/universal-workflow/src/public-api';
import { DataService } from './data.service';

@Component({
  selector: 'app-workflow-widget-demo',
  template: `
    @if(loading){
    <div class="d-flex justify-content-center align-items-center my-5">
      <uiowa-ring></uiowa-ring>
    </div>
    } @else { @if(dataRows){
    <div>
      @for(item of dataRows; track item){
      <div>{{ item }}</div>
      }
    </div>
    @if(uwPermissions?.canSign){
    <workflow-widget [packageId]="packageId" />
    } @else {
    <uw-routing-history [packageId]="packageId" />
    } } @else {
    <div class="alert alert-danger my-3" role="alert">
      @if(packageId){ The Universal Workflow package ID "{{ packageId }}" is
      invalid or you don't have enough permissions to view this workflow
      package. } @else { Please provide a Workflow PackageID. You may want to
      navigate from your workflow inbox to this website. }
    </div>
    } }
  `,
  styles: [],
  standalone: false,
})
export class WorkflowWidgetDemoComponent implements OnInit {
  packageId = 0;
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
          this.packageId = +(params.get('packageId') || '');
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
