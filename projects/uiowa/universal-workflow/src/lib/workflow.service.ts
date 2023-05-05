import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, ReplaySubject, shareReplay } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export interface WidgetConfig {
  clientId: string;
  workflowEnvironment: string;
  formId: number;
  scope: string;
}

export interface WorkflowAllowedActions {
  signatureId?: number;
  canAddApprover: boolean;
  canSign: boolean;
  canVoidAfter: boolean;
  canView: boolean;
  packageId: number;
  canInitiatorVoid: boolean;
  canEdit: boolean;
  canVoid: boolean;
}

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  protected readonly api: string = 'api/workflow';
  private _loadedLibraries: { [url: string]: ReplaySubject<number> } = {};
  today = new Date();
  private _widgetConfig$?: Observable<WidgetConfig>;

  constructor(
    protected httpClient: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  getWorkflowWidgetConfig(): Observable<WidgetConfig> {
    if (!this._widgetConfig$) {
      this._widgetConfig$ = this.httpClient
        .get<WidgetConfig>(`${this.api}/widget-config`)
        .pipe(shareReplay(1));
    }
    return this._widgetConfig$;
  }

  getPackageRoutingHistory(packageId: number): Observable<string> {
    return this.httpClient.get<string>(
      `${this.api}/packages/${packageId}/routing-history`
    );
  }

  lazyLoadWorkflowWidget(): Observable<any> {
    return this.loadScript(
      'https://workflow.uiowa.edu/workflow-widget/workflow.js?ver=' +
        new Date().getTime()
    );
  }

  lazyLoadHistoryWidget(): Observable<any> {
    return forkJoin([
      this.loadScript(
        'https://workflow.uiowa.edu/workflow-widget/historyFormat.js?ver=' +
          this.today.getTime()
      ),
      this.loadScript(
        'https://workflow.uiowa.edu/workflow-widget/assets/js/workflow-widget-route-table.js?ver=' +
          this.today.getTime()
      ),
      this.loadScript('https://code.jquery.com/jquery-3.6.0.min.js'),
      this.loadScript(
        'https://workflow.uiowa.edu/workflow-widget/assets/js/moment/moment.2.7.0.js'
      ),
    ]);
  }

  private loadScript(url: string): Observable<any> {
    if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
    }

    this._loadedLibraries[url] = new ReplaySubject();

    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = () => {
      this._loadedLibraries[url].next(1);
      this._loadedLibraries[url].complete();
    };

    this.document.body.appendChild(script);

    return this._loadedLibraries[url].asObservable();
  }
}
