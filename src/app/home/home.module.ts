import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';
import { InfDateRangePickerModule } from '@influans/inf-date-range-picker';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    InfDateRangePickerModule,
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
