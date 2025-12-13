import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ResidentService } from '../../services/resident-service';
import { ResidentSpotCardComponent } from '../../components/resident-spot-card-component/resident-spot-card-component';
import { ResidentRegisterRaffleModal } from '../../components/resident-register-raffle-modal/resident-register-raffle-modal';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-resident-history-page',
  imports: [ResidentSpotCardComponent, ResidentRegisterRaffleModal, JsonPipe],
  templateUrl: './resident-history-page.html',
  styleUrl: './resident-history-page.scss',
})
export class ResidentHistoryPage {
  private residentService = inject(ResidentService);

  hasRegistered = signal(false);
  registerMessage = signal('');

  historyResource = rxResource({
    stream: () => this.residentService.getResidentHistory(),
  });

  isCurrentlyRegisteredForRaffle = computed(() => {
    return this.historyResource.value()?.registeredForRaffle ?? false;
  });

  buttonLabel = computed(() =>
    this.isCurrentlyRegisteredForRaffle()
      ? 'Unregister for next raffle'
      : 'Register for next Raffle',
  );

  closeModal(event: string) {
    const dialog = document.getElementById(
      'register_raffle_modal',
    ) as HTMLDialogElement | null;

    dialog?.close();
    this.historyResource.reload();
    this.registerMessage.set(event);
    this.hasRegistered.set(true);
    setTimeout(() => this.hasRegistered.set(false), 4000);
  }
}
