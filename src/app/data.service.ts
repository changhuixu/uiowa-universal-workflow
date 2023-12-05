import { Injectable } from '@angular/core';
import { WorkflowAllowedActions } from '../../projects/uiowa/universal-workflow/src/public-api';
import { Observable, delay, of } from 'rxjs';

export interface MyForm {
  data: string[];
  permissions: WorkflowAllowedActions;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getMyForm(packageId: number): Observable<MyForm> {
    return of<MyForm>({
      data: [
        'This is your form details',
        'and other data',
        `packageId = ${packageId}`,
        `This is a demo. This widget is not valid in a demo so it will show as a routing history here.`,
      ],
      permissions: {
        canSign: false,
      } as WorkflowAllowedActions,
    }).pipe(delay(2 * 1000));
  }
}
