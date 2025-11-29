import { Component } from '@angular/core';
import { UwRoutingHistory } from '../../projects/uiowa/universal-workflow/src/public-api';

@Component({
  selector: 'app-routing-history-demo',
  imports: [UwRoutingHistory],
  template: `
    <uw-routing-history [packageId]="12560209"></uw-routing-history>
    <br />
    <uw-routing-history [packageId]="13082237"></uw-routing-history>
  `,
  styles: ``,
})
export class RoutingHistoryDemo {}
