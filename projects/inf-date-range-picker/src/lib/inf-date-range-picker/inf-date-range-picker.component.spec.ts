import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfDateRangePickerComponent } from './inf-date-range-picker.component';


describe('DateRangePickerComponent', () => {
  let component: InfDateRangePickerComponent;
  let fixture: ComponentFixture<InfDateRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfDateRangePickerComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
