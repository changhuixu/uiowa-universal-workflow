# UIOWA Universal Workflow

[![npm](https://img.shields.io/npm/v/@uiowa/universal-workflow.svg?style=flat-square)](https://www.npmjs.com/package/@uiowa/universal-workflow)

This NPM package `@uiowa/universal-workflow` serves as the standard way to display Universal Workflow widget and routing history in Angular. The package contains two components, `workflow-widget` and `uw-routing-history`, and a service `WorkflowService`.

This package depends on `@uiowa/spinner` which shows a loading placeholder while the Universal Workflow data is loading.

[Demo](https://changhuixu.github.io/uiowa-universal-workflow/)

## Usage

- The Widget Component

  ```html
  <ng-container *ngIf="uwPermissions?.canSign; else history">
    <workflow-widget
      [packageId]="packageId"
      [signatureId]="signatureId"
    ></workflow-widget>
  </ng-container>

  <ng-template #history>
    <uw-routing-history [packageId]="packageId"></uw-routing-history>
  </ng-template>
  ```

  ```ts
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
  ```

- The Routing History Component

  ```html
  <uw-routing-history [packageId]="13082237"></uw-routing-history>
  ```

- The Workflow Service

  By default, you don't need to touch the `WorkflowService`. The service has two methods: `getWorkflowWidgetConfig()` and `getPackageRoutingHistory(packageId: number): Observable<string>`, which call backend API endpoints `${this.api}/widget-config` and `${this.api}/packages/${packageId}/routing-history` where `protected readonly api: string = 'api/workflow'`.

  If you decide to choose a different implementation, then you can follow the demo app in this solution to provide another service.
