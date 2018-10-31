/**
 * date-range-picker.component
 */

import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnInit,
  Output, OnChanges, SimpleChanges, DoCheck, KeyValueDiffers
} from '@angular/core';
import * as dateFns from 'date-fns';

export interface IDateRange {
  from: Date;
  to: Date;
}

export enum Range {
  THIS_WEEK, NEXT_WEEK, THIS_MONTH, NEXT_MONTH
}

@Component({
  selector: 'inf-date-range',
  templateUrl: './inf-date-range-picker.component.html',
  styleUrls: ['./inf-date-range-picker.component.scss']
})
export class InfDateRangePickerComponent implements OnInit, OnChanges, DoCheck {

  public opened: false | 'from' | 'to';
  public datePick: IDateRange;
  public range: Range;
  public moment: Date;
  public dayNames: string[];
  public dates: Date[];
  public rangeEnum: any = Range;
  @Input() public themeColor: 'green' | 'teal' | 'grape' | 'red' | 'gray';

  @Input() dateRange: IDateRange;

  @Output() private dateRangeChange = new EventEmitter<IDateRange>();

  private diffDateRange: any;

  constructor(private elementRef: ElementRef,
              private differs: KeyValueDiffers) { }

  public ngOnInit() {
    this.opened = false;
    this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.datePick = {
      from: null,
      to: null
    };

    this.diffDateRange = this.differs.find(this.dateRange).create();

    this.initCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Boolean(changes.dateRange.previousValue) && changes.dateRange.previousValue !== changes.dateRange.currentValue) {
      this.initCalendar();
    }
  }

  ngDoCheck(): void {
    const dateRangeChange = this.diffDateRange.diff(this.dateRange);

    if (dateRangeChange) {
      this.initCalendar();
    }
  }

  @HostListener('document:click', ['$event'])
  handleBlurClick( e: MouseEvent ) {
    const target = e.srcElement || e.target;
    if (!this.elementRef.nativeElement.contains(e.target)
      && !(<Element> target).classList.contains('yk-day-num')) {
      this.opened = false;
    }
  }

  public toggleCalendar( selection: false | 'from' | 'to' ): void {
    if (this.opened && this.opened !== selection) {
      this.opened = selection;
    } else {
      this.opened = this.opened ? false : selection;
    }

    if (selection && this.datePick[selection]) {
      const diffMonths = dateFns.differenceInCalendarMonths(
        this.datePick[selection], this.moment);

      if (diffMonths !== 0) {
        this.moment = dateFns.addMonths(this.moment, diffMonths);
        this.generateCalendar();
      }
    }
  }

  public selectThisMonth() {
    const today = dateFns.startOfDay(new Date());
    this.range = Range.THIS_MONTH;

    this.datePick = {
      from: today,
      to: dateFns.endOfMonth(today)
    };

    this.dispatchNewDateRange();
  }

  public selectNextMonth() {
    const today = dateFns.addMonths(dateFns.startOfDay(new Date()), 1);
    this.range = Range.NEXT_MONTH;

    this.datePick = {
      from: dateFns.startOfMonth(today),
      to: dateFns.endOfMonth(today)
    };

    this.dispatchNewDateRange();
  }

  public selectThisWeek() {
    const today = dateFns.startOfDay(new Date());
    this.range = Range.THIS_WEEK;

    this.datePick = {
      from: today,
      to: dateFns.endOfWeek(today)
    };

    this.dispatchNewDateRange();
  }

  public selectNextWeek() {
    const today = dateFns.addWeeks(dateFns.startOfDay(new Date()), 1);
    this.range = Range.NEXT_WEEK;

    this.datePick = {
      from: dateFns.startOfWeek(today),
      to: dateFns.endOfWeek(today)
    };

    this.dispatchNewDateRange();
  }

  public generateCalendar(): void {
    this.dates = [];
    const firstDate = dateFns.startOfMonth(this.moment);
    const start = 0 - (dateFns.getDay(firstDate) + 7) % 7;
    const end = 41 + start; // iterator ending point

    for (let i = start; i <= end; i += 1) {
      const day = dateFns.addDays(firstDate, i);
      this.dates.push(day);
    }
  }

  public selectDate( date: Date ): void {
    this.range = null;

    if (this.opened === 'from') {
      this.datePick.from = date;
      this.datePick.to = null;
      this.toggleCalendar('to');
    } else if (this.opened === 'to') {
      if (this.datePick && this.datePick.from &&
        dateFns.compareAsc(date, this.datePick.from) < 0) {
        this.datePick.from = date;
        this.datePick.to = null;
      } else {
        this.datePick.to = date;
        this.toggleCalendar('from');
      }
    }

    this.dispatchNewDateRange();
  }

  public prevMonth(): void {
    this.moment = dateFns.addMonths(this.moment, -1);
    this.generateCalendar();
  }

  public nextMonth(): void {
    this.moment = dateFns.addMonths(this.moment, 1);
    this.generateCalendar();
  }

  public isWithinRange( day: Date ): boolean {
    return this.datePick.from && this.datePick.to
      && dateFns.isWithinRange(day, this.datePick.from, this.datePick.to);
  }

  public isDateRangeFrom( day: Date ): boolean {
    return dateFns.isSameDay(day, this.datePick.from);
  }

  public isDateRangeTo( day: Date ): boolean {
    return dateFns.isSameDay(day, this.datePick.to);
  }

  public isRangeSelected(range: Range) {
    return this.range === range;
  }

  private initCalendar() {
    this.moment = new Date();

    if (this.dateRange &&
      this.dateRange.from &&
      this.dateRange.to) {
      this.datePick = Object.assign({}, this.datePick, this.dateRange);
      this.datePick.from = dateFns.startOfDay(this.datePick.from);
      this.datePick.to = dateFns.endOfDay(this.datePick.to);

      this.moment = new Date(this.datePick.from);
    }

    this.generateCalendar();
  }

  private dispatchNewDateRange() {
    this.dateRangeChange.emit(Object.assign({}, this.datePick));
  }
}
