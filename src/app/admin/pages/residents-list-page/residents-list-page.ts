import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AdminService } from '../../services/admin-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BooleanIconPipe } from '../../../shared/pipes/boolean-icon-pipe';
import { Resident } from '../../interfaces/resident-response.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-residents-list-page',
  imports: [RouterLink, BooleanIconPipe],
  templateUrl: './residents-list-page.html',
  styleUrl: './residents-list-page.scss',
})
export class ResidentsListPage {
  private adminService = inject(AdminService);
  private router = inject(Router);

  alertMessage = signal('');
  hasDeleted = signal(false);

  residentsResource = rxResource({
    stream: () => {
      return this.adminService.getResidents();
    },
  });

  editResident(resident: Resident) {
    this.router.navigate(['/admin/resident-edit', resident.id], {
      state: { resident },
    });
  }

  deleteResident(id: string) {
    this.adminService
      .deleteResident(id)
      .pipe(take(1))
      .subscribe((res) => {
        this.alertMessage.set(res.message);
        this.hasDeleted.set(true);
        setTimeout(() => this.hasDeleted.set(false), 3000);
        this.residentsResource.reload();
      });
  }
}
