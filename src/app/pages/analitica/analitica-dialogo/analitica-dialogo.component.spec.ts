import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticaDialogoComponent } from './analitica-dialogo.component';

describe('AnaliticaDialogoComponent', () => {
  let component: AnaliticaDialogoComponent;
  let fixture: ComponentFixture<AnaliticaDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliticaDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliticaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
