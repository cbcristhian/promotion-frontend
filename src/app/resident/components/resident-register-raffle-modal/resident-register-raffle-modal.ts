import { Component, inject, output, input } from '@angular/core';
import { ResidentService } from '../../services/resident-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-resident-register-raffle-modal',
  imports: [],
  templateUrl: './resident-register-raffle-modal.html',
  styleUrl: './resident-register-raffle-modal.scss',
})
export class ResidentRegisterRaffleModal {
  residentService = inject(ResidentService);
  registered = output<string>();
  isRegistered = input<boolean>(false);

  register() {
    this.residentService
      .registerForRaffle()
      .pipe(take(1))
      .subscribe((res) => {
        this.registered.emit(res);
      });
  }
}
