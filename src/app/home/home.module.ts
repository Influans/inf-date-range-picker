import {DateRangePickerModule} from '@influans/inf-date-range-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {HomeComponent} from './home.component';

import {HomeRoutingModule} from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    DateRangePickerModule,
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
