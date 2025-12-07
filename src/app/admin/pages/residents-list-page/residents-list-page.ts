import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-residents-list-page',
  imports: [RouterLink],
  templateUrl: './residents-list-page.html',
  styleUrl: './residents-list-page.scss',
})
export class ResidentsListPage {
  private adminService = inject(AdminService);

  residentsResource = rxResource({
    params: () => ({}),
    stream: () => {
      return this.adminService.getResidents();
    },
  });
}
