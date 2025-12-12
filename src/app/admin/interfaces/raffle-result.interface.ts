export interface RaffleResult {
  message: string;
  latestRaffle: Raffle;
}

export interface Raffle {
  executedAt: Date;
  residents: ResidentRaffle[];
}

export interface ResidentRaffle {
  residentId: string;
  name: string;
  apartmentNumber: number;
  parkingSpotId: null | string;
}
