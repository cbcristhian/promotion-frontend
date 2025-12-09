import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AdminService } from '../../services/admin-service';
import {
  Resident,
  ResidentCreatedResponse,
} from '../../interfaces/resident-response.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-resident-form-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resident-form-page.html',
  styleUrl: './resident-form-page.scss',
})
export class ResidentFormPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);

  id = signal<string | null>(this.route.snapshot.paramMap.get('id'));

  isEdit = computed(() => !!this.id());

  private navigationState = this.router.currentNavigation()?.extras?.state as {
    resident?: Resident;
  };

  residentToEdit = signal<Resident | null>(
    this.navigationState?.resident ?? null,
  );

  residentForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    apartmentNumber: [0, Validators.required],
  });

  isSubmitting = signal(false);

  constructor() {
    this.initializeFormEffect();
  }

  private initializeFormEffect() {
    effect(() => {
      if (this.isEdit()) {
        this.setupEditMode();
      } else {
        this.setupCreateMode();
      }
    });
  }

  private setupCreateMode() {
    this.residentForm
      .get('password')
      ?.setValidators([Validators.required, Validators.minLength(3)]);

    this.residentForm.get('password')?.enable();
    this.residentForm.get('password')?.updateValueAndValidity();
  }

  private setupEditMode() {
    const resident = this.residentToEdit();

    if (!resident) {
      // Fallback safety for reload
      this.router.navigateByUrl('/admin/resident-list');
      return;
    }

    this.residentForm.patchValue({
      email: resident.email,
      name: resident.name,
      apartmentNumber: resident.apartmentNumber,
    });

    this.residentForm.get('password')?.disable();
  }

  onSubmit() {
    if (this.residentForm.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    const formValue = this.residentForm.getRawValue();

    const request$ = this.isEdit()
      ? this.adminService.patchResident(
          {
            email: formValue.email,
            name: formValue.name,
            apartmentNumber: formValue.apartmentNumber,
          },
          this.id()!,
        )
      : this.adminService.createResident({
          email: formValue.email,
          password: formValue.password,
          name: formValue.name,
          apartmentNumber: formValue.apartmentNumber,
        });

    request$.pipe(take(1)).subscribe({
      next: (res: ResidentCreatedResponse) => {
        Swal.fire({ title: res.message, icon: 'success' });
        this.router.navigateByUrl('/admin/resident-list');
      },
      error: () => {
        this.isSubmitting.set(false);
        Swal.fire({ title: 'Something went wrong', icon: 'error' });
      },
    });
  }
}
