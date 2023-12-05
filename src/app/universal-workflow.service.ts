import { Injectable } from '@angular/core';
import { WorkflowService } from '../../projects/uiowa/universal-workflow/src/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniversalWorkflowService extends WorkflowService {
  override readonly api = 'assets';
  override getPackageRoutingHistory(packageId: number): Observable<string> {
    return this.httpClient.get<string>(`${this.api}/${packageId}.json`);
  }
}
