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

@Component({
  selector: 'inf-date-range',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit, OnChanges, DoCheck {

  public opened: false | 'from' | 'to';
  public datePick: IDateRange;
  public range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly';
  public moment: Date;
  public dayNames: string[];
  public dates: Date[];
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

  public selectRange( range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly' ): void {
    let today = dateFns.startOfDay(new Date());

    switch (range) {
      case 'tm':
        this.datePick = {
          from: dateFns.startOfMonth(today),
          to: dateFns.endOfMonth(today)
        };
        break;
      case 'lm':
        today = dateFns.subMonths(today, 1);
        this.datePick = {
          from: dateFns.startOfMonth(today),
          to: dateFns.endOfMonth(today)
        };
        break;
      case 'lw':
        today = dateFns.subWeeks(today, 1);
        this.datePick = {
          from: dateFns.startOfWeek(today),
          to: dateFns.endOfWeek(today)
        };
        break;
      default:
      case 'tw':
        this.datePick = {
          from: dateFns.startOfWeek(today),
          to: dateFns.endOfWeek(today)
        };
        break;
      case 'ty':
        this.datePick = {
          from: dateFns.startOfYear(today),
          to: dateFns.endOfYear(today)
        };
        break;
      case 'ly':
        today = dateFns.subYears(today, 1);
        this.datePick = {
          from: dateFns.startOfYear(today),
          to: dateFns.endOfYear(today)
        };
        break;
    }

    this.range = range;
    this.moment = new Date(this.datePick.from);
    this.generateCalendar();
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

    if (this.opened === 'from') {
      this.datePick.from = date;

      if (this.datePick && this.datePick.to &&
        dateFns.compareDesc(date, this.datePick.to) < 1) {
        this.datePick.to = null;
      }

      this.toggleCalendar('to');
    } else if (this.opened === 'to') {
      this.datePick.to = date;

      if (this.datePick && this.datePick.from &&
        dateFns.compareAsc(date, this.datePick.from) < 1) {
        this.datePick.from = null;
      }

      this.toggleCalendar('from');
    }

    this.dateRangeChange.emit(Object.assign({}, this.datePick));

    /*let diffMonths = dateFns.differenceInCalendarMonths(date, this.moment);

    if (diffMonths !== 0) {
        this.moment = dateFns.addMonths(this.moment, diffMonths);
        this.generateCalendar();
    }*/
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

  private initCalendar() {
    if (this.dateRange &&
      this.dateRange.from &&
      this.dateRange.to) {
      this.datePick = Object.assign({}, this.datePick, this.dateRange);
      this.datePick.from.setHours(0, 0, 0, 0);
      this.datePick.to.setHours(23, 59, 59, 99);
      this.moment = new Date(this.datePick.from);
      this.generateCalendar();
    }
  }
}
