import { Component } from '@angular/core';

@Component({
  selector: 'app-routing-history-demo',
  template: `
    <uw-routing-history [packageId]="12560209"></uw-routing-history>
    <br />
    <uw-routing-history [packageId]="13082237"></uw-routing-history>
  `,
  styles: [],
  standalone: false,
})
export class RoutingHistoryDemoComponent {}
