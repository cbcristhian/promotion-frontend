import { User } from '../../auth/interfaces/user.interface';

export interface ResidentsResponse {
  count: number;
  residents: Resident[];
}

export interface Resident extends User {
  apartmentNumber: string;

  // raffle-related
  registeredForCurrentRaffle: boolean;

  // history references
  assignmentHistoryIds: string[];
}
