import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ResidentHistory } from '../../interfaces/resident-history.interface';

@Component({
  selector: 'app-resident-spot-card-component',
  imports: [DatePipe],
  templateUrl: './resident-spot-card-component.html',
  styleUrl: './resident-spot-card-component.scss',
})
export class ResidentSpotCardComponent {
  history = input.required<ResidentHistory>({});

  isLatest = input(true);

  spotLabel = computed(() =>
    this.isLatest() ? 'Current Spot' : 'Spot Assigned',
  );

  dateLabel = computed(() => (this.isLatest() ? 'Assigned On' : 'Raffle Date'));
}
