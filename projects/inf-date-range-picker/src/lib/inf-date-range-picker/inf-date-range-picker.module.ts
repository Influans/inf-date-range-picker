import { NgModule } from '@angular/core';
import { InfDateRangePickerComponent } from './inf-date-range-picker.component';
import { CommonModule } from '@angular/common';
import { IconCalendarComponent } from './icon-calendar/icon-calendar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InfDateRangePickerComponent,
    IconCalendarComponent
  ],
  exports: [InfDateRangePickerComponent]
})
export class InfDateRangePickerModule { }
