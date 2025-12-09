import { User } from '../../auth/interfaces/user.interface';

export interface ResidentsResponse {
  count: number;
  residents: Resident[];
}

export interface ResidentCreatedResponse {
  message: string;
  resident: Resident;
}

export interface Resident extends User {
  apartmentNumber: number;

  // raffle-related
  registeredForCurrentRaffle: boolean;

  // history references
  assignmentHistoryIds?: string[];
}
