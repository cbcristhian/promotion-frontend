export interface CreateResident {
  email: string;
  password: string;
  name: string;
  apartmentNumber: number;
}

export interface UpdateResident {
  email: string;
  name: string;
  apartmentNumber: number;
}
