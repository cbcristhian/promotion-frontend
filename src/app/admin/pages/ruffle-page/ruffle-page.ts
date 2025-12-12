import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { RaffleResult } from '../../interfaces/raffle-result.interface';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { rxResource } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ruffle-page',
  imports: [DatePipe],
  templateUrl: './ruffle-page.html',
  styleUrl: './ruffle-page.scss',
})
export class RufflePage {
  private adminService = inject(AdminService);

  isRunning = signal(false);

  latestResource = rxResource({
    stream: () => {
      return this.adminService.getLatestRaffle();
    },
  });

  runRaffle() {
    this.isRunning.set(true);

    this.adminService
      .runRaffle()
      .pipe(take(1))
      .subscribe({
        next: (res: RaffleResult) => {
          Swal.fire({ title: res.message, icon: 'success' });
          this.latestResource.reload();
          this.isRunning.set(false);
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire({ title: error.error.message, icon: 'error' });
          this.isRunning.set(false);
        },
      });
  }
}
