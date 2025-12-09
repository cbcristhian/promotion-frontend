import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentFormPage } from './resident-form-page';

describe('ResidentFormPage', () => {
  let component: ResidentFormPage;
  let fixture: ComponentFixture<ResidentFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
