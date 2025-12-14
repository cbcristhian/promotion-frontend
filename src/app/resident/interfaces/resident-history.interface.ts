export interface ResidentHistoryResult {
  registeredForRaffle: boolean;
  residentHistory: ResidentHistory[];
}

export interface ResidentHistory {
  executedAt: string;
  residentId: string;
  name: string;
  apartmentNumber: number;
  parkingSpotId: string;
}
