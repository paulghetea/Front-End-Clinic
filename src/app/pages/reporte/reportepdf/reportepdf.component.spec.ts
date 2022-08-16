import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportepdfComponent } from './reportepdf.component';

describe('ReportepdfComponent', () => {
  let component: ReportepdfComponent;
  let fixture: ComponentFixture<ReportepdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportepdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportepdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
