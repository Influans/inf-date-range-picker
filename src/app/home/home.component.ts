import { IDateRange } from '@influans/inf-date-range-picker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'idpd-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  dateRange: IDateRange;

  constructor() { }

  ngOnInit() {
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 1);

    this.dateRange = {
      from: null,
      to: null
    };
  }

  changeDate() {
    console.log('changeDate');
  }

}
