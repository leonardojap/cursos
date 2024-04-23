import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    FooterComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, RouterModule],
  exports: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class LayoutModule {}
