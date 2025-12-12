import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ResidentService } from '../../services/resident-service';
import { ResidentSpotCardComponent } from '../../components/resident-spot-card-component/resident-spot-card-component';

@Component({
  selector: 'app-resident-history-page',
  imports: [ResidentSpotCardComponent],
  templateUrl: './resident-history-page.html',
  styleUrl: './resident-history-page.scss',
})
export class ResidentHistoryPage {
  private residentService = inject(ResidentService);

  historyResource = rxResource({
    stream: () => this.residentService.getResidentHistory(),
  });
}
