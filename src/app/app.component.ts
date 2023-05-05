import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="tab">
      <a routerLink="routing-history" routerLinkActive="active">
        Routing History Demo
      </a>
      <a
        routerLink="workflow-widget"
        [queryParams]="{
          formId: 15390,
          packageId: 12560209,
          signatureId: 6019369
        }"
        routerLinkActive="active"
      >
        Workflow Widget Demo
      </a>
      <a
        title="github"
        href="https://github.com/changhuixu/uiowa-universal-workflow"
        target="_blank"
        rel="noopener"
        style="float: right;"
      >
        GitHub Repo
      </a>
    </nav>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .tab {
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
      }

      .tab a {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 1rem;
        transition: 0.3s;
        font-weight: 600;
        text-decoration: none;
      }

      .tab a:hover {
        background-color: #ddd;
      }

      .tab a.active {
        background-color: #ccc;
      }

      .content {
        padding: 1rem;
        border: 1px solid #ccc;
        border-top: none;
      }
    `,
  ],
})
export class AppComponent {}
