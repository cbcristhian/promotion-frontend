import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentRegisterRaffleModal } from './resident-register-raffle-modal';

describe('ResidentRegisterRaffleModal', () => {
  let component: ResidentRegisterRaffleModal;
  let fixture: ComponentFixture<ResidentRegisterRaffleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentRegisterRaffleModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentRegisterRaffleModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
