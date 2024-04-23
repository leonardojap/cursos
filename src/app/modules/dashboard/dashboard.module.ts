import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from '@shared/components/card/card.component';
import { LayoutModule } from '../layout/layout.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, LayoutModule, CardComponent],
})
export class DashboardModule {}
