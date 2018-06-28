import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent } from './date-range-picker.component';
import {IconCalendarComponent} from './icon-calendar/icon-calendar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateRangePickerComponent,
    IconCalendarComponent
  ],
  exports: [ DateRangePickerComponent ]

})
export class DateRangePickerModule { }
