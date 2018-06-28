import { Component, Input } from '@angular/core';

@Component({
  selector: 'inf-icon-calendar',
  templateUrl: './icon-calendar.component.html',
  styleUrls: ['./icon-calendar.component.scss']
})
export class IconCalendarComponent {
  @Input() isActive: boolean;
}
