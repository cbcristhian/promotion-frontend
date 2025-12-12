import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RufflePage } from './ruffle-page';
import { AdminService } from '../../services/admin-service';
import { of } from 'rxjs';

describe('RufflePage', () => {
  let component: RufflePage;
  let fixture: ComponentFixture<RufflePage>;

  // --- Mock AdminService ---
  const mockAdminService = {
    getLatestRaffle: jasmine
      .createSpy('getLatestRaffle')
      .and.returnValue(of({})),
    runRaffle: jasmine.createSpy('runRaffle'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RufflePage],
      providers: [{ provide: AdminService, useValue: mockAdminService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RufflePage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run raffle successfully', () => {
    mockAdminService.runRaffle.and.returnValue(of({ result: 'ok' }));

    const reloadSpy = spyOn(component.latestResource, 'reload');

    component.runRaffle();

    expect(component.isRunning()).toBeFalse(); // reset after success
    expect(reloadSpy).toHaveBeenCalled();
    expect(mockAdminService.runRaffle).toHaveBeenCalled();
  });
});
