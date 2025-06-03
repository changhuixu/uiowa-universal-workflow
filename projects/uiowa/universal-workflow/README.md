# UIOWA Universal Workflow

[![Build Status](https://github.com/changhuixu/uiowa-universal-workflow/actions/workflows/main.yml/badge.svg)](https://github.com/changhuixu/uiowa-universal-workflow/actions)

[![npm](https://img.shields.io/npm/v/@uiowa/universal-workflow.svg?style=flat-square)](https://www.npmjs.com/package/@uiowa/universal-workflow)

This NPM package `@uiowa/universal-workflow` serves as the standard way to display Universal Workflow widget and routing history in Angular. The package contains two components, `workflow-widget` and `uw-routing-history`, and a service `WorkflowService`.

This package depends on `@uiowa/spinner` which shows a loading placeholder while the Universal Workflow data is loading.

[Demo](https://changhuixu.github.io/uiowa-universal-workflow/)

## Usage

- The Widget Component

  ```html
  @if(uwPermissions?.canSign){
  <workflow-widget [packageId]="packageId" />
  } @else {
  <uw-routing-history [packageId]="packageId" />
  }
  ```

  ```ts
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
  ```

- The Routing History Component

  ```html
  <uw-routing-history [packageId]="13082237"></uw-routing-history>
  ```

- The Workflow Service

  By default, you don't need to touch the `WorkflowService`. The service has two methods: `getWorkflowWidgetConfig()` and `getPackageRoutingHistory(packageId: number): Observable<string>`, which call backend API endpoints `${this.api}/widget-config` and `${this.api}/packages/${packageId}/routing-history` where `protected readonly api: string = 'api/workflow'`.

  If you decide to choose a different implementation, then you can follow the demo app in this solution to provide another service.
