import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentSpotCardComponent } from './resident-spot-card-component';

describe('ResidentSpotCardComponent', () => {
  let component: ResidentSpotCardComponent;
  let fixture: ComponentFixture<ResidentSpotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentSpotCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentSpotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
