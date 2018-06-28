import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateRangePickerModule} from 'inf-date-range-picker';

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
