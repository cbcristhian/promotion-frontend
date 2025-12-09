import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentFormPage } from './resident-form-page';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin-service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('ResidentFormPage', () => {
  let component: ResidentFormPage;
  let fixture: ComponentFixture<ResidentFormPage>;

  // Mock objects
  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    currentNavigation: () => ({ extras: { state: {} } }), // <- important!
  };

  const mockActivatedRoute = {
    snapshot: { paramMap: { get: () => null } },
  };

  const mockAdminService = {
    createResident: jasmine
      .createSpy('createResident')
      .and.returnValue(of({ message: 'Created' })),
    patchResident: jasmine
      .createSpy('patchResident')
      .and.returnValue(of({ message: 'Updated' })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentFormPage],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AdminService, useValue: mockAdminService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set up create mode if no id', () => {
    expect(component.isEdit()).toBeFalse();
    expect(component.residentForm.get('password')?.enabled).toBeTrue();
    expect(component.residentForm.get('password')?.validator).toBeTruthy();
  });
});
