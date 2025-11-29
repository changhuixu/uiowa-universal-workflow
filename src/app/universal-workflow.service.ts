import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { WorkflowService } from '../../projects/uiowa/universal-workflow/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class UniversalWorkflowService extends WorkflowService {
  override readonly api = '';
  override getPackageRoutingHistory(packageId: number): Observable<string> {
    return this.httpClient.get<string>(`${this.api}/${packageId}.json`).pipe(delay(1000));
  }
}
