import { Component, OnInit } from '@angular/core';
import { IDateRange } from 'inf-date-range-picker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  dateRange: IDateRange;

  constructor() { }

  ngOnInit() {
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 1);

    this.dateRange = {
      from: new Date(),
      to: defaultEndDate
    };

    setTimeout(() => {
      console.log('setTimeout');
      const fromDate = new Date();
      const endDate = new Date();

      fromDate.setDate(fromDate.getDate() + 5);
      endDate.setDate(endDate.getDate() + 10);

      this.dateRange.from = fromDate;
      this.dateRange.to = endDate;
    }, 500);
  }

  changeDate() {
    console.log('changeDate');
  }

}
