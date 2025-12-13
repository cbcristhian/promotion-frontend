import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentRegisterRaffleModal } from './resident-register-raffle-modal';
import { ResidentService } from '../../services/resident-service';
import { of } from 'rxjs';

describe('ResidentRegisterRaffleModal', () => {
  let component: ResidentRegisterRaffleModal;
  let fixture: ComponentFixture<ResidentRegisterRaffleModal>;

  const mockResidentService = {
    registerForRaffle: jasmine
      .createSpy('registerForRaffle')
      .and.returnValue(of('Registered successfully')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentRegisterRaffleModal],
      providers: [{ provide: ResidentService, useValue: mockResidentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentRegisterRaffleModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerForRaffle and emit registered event', () => {
    const emitSpy = spyOn(component.registered, 'emit');

    component.register();

    expect(mockResidentService.registerForRaffle).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith('Registered successfully');
  });
});
