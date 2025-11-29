import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, shareReplay } from 'rxjs';

export interface WidgetConfig {
  clientId: string;
  workflowEnvironment: string;
  formId: number;
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
  private _loadedLibraries: { [url: string]: ReplaySubject<boolean> } = {};
  private _widgetConfig$?: Observable<WidgetConfig>;

  protected httpClient = inject(HttpClient);
  private document = inject(DOCUMENT);

  getWorkflowWidgetConfig(): Observable<WidgetConfig> {
    if (!this._widgetConfig$) {
      this._widgetConfig$ = this.httpClient
        .get<WidgetConfig>(`${this.api}/widget-config`)
        .pipe(shareReplay(1));
    }
    return this._widgetConfig$;
  }

  getPackageRoutingHistory(packageId: number): Observable<string> {
    return this.httpClient.get<string>(`${this.api}/packages/${packageId}/routing-history`);
  }

  lazyLoadWorkflowWidget(): Observable<any> {
    return this.loadScript(
      'https://workflow.uiowa.edu/workflow-widget/widgetLoader.js?v=' + new Date().getTime()
    );
  }

  lazyLoadHistoryWidget(): Observable<any> {
    return this.loadScript(
      'https://workflow.uiowa.edu/assets/dist/embeds/history/routing-history.js?cache=' +
        new Date().toISOString().slice(0, 13).replace(/\D/g, '')
    ); // this script will be cached for an hour
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
      this._loadedLibraries[url].next(true);
      this._loadedLibraries[url].complete();
    };
    script.onerror = () => {
      this._loadedLibraries[url].next(false);
      this._loadedLibraries[url].complete();
    };
    this.document.body.appendChild(script);

    return this._loadedLibraries[url].asObservable();
  }
}
