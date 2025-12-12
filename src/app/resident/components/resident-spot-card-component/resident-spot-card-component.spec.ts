import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentSpotCardComponent } from './resident-spot-card-component';
import { ResidentHistory } from '../../interfaces/resident-history.interface';

describe('ResidentSpotCardComponent', () => {
  let component: ResidentSpotCardComponent;
  let fixture: ComponentFixture<ResidentSpotCardComponent>;

  const mockHistory: ResidentHistory = {
    executedAt: '2025-12-12T18:11:13.345Z',
    residentId: '03af2112-66d9-405f-87c1-3c4cc03305fb',
    name: 'residente2',
    apartmentNumber: 2,
    parkingSpotId: 'P2',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentSpotCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentSpotCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('history', mockHistory);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "Current Spot" when isLatest = true', () => {
    fixture.componentRef.setInput('isLatest', true);
    fixture.detectChanges();

    expect(component.spotLabel()).toBe('Current Spot');
    expect(component.dateLabel()).toBe('Assigned On');
  });

  it('should show "Spot Assigned" when isLatest = false', () => {
    fixture.componentRef.setInput('isLatest', false);
    fixture.detectChanges();

    expect(component.spotLabel()).toBe('Spot Assigned');
    expect(component.dateLabel()).toBe('Raffle Date');
  });

  it('should accept ResidentHistory input correctly', () => {
    expect(component.history()).toEqual(mockHistory);
  });
});
