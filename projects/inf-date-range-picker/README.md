# Influans Date Range Picker for Angular
it's a fork of [date-range-picker](https://github.com/DanielYKPan/date-range-picker)

## Description
Simple Angular date range picker.
This picker is responsive design, so feel free to try it in your desktops, tablets and mobile devices. 
This picker uses javascript library [date-fns](https://date-fns.org/)

## Installation

To install this component, follow the procedure:

1. __Install with [npm](https://www.npmjs.com):`npm install inf-date-range-picker --save`__
2. Add __DateRangePickerModule__ import to your __@NgModule__ like example below
    ```js
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { MyTestApp } from './my-test-app';

    import { DateRangePickerModule } from 'ng-pick-daterange';

    @NgModule({
        imports:      [ BrowserModule, DateRangePickerModule ],
        declarations: [ MyTestApp ],
        bootstrap:    [ MyTestApp ]
    })
    export class MyTestAppModule {}
    ```    
## Usage

Use the following snippet inside your template. For example:

```html
<inf-date-range [(dateRange)]="dateRange"></inf-date-range>
```
<p>Or:</p>

```html
<inf-date-range [dateRange]="dateRange" (dateRangeChange)="setReturnValue($event)"></inf-date-range>
```
```typescript
public setReturnValue(dateRange: IDateRange): any {
    this.dateRange = dateRange;
    // Do whatever you want to the return object 'dateRange'
}
```

## License
* License: MIT

## Author
* Author: Influans
