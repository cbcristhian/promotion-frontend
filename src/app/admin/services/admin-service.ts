import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateResident,
  UpdateResident,
} from '../interfaces/create-update.interface';
import {
  ResidentCreatedResponse,
  ResidentsResponse,
} from '../interfaces/resident-response.interface';
import { RaffleResult } from '../interfaces/raffle-result.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  getResidents(): Observable<ResidentsResponse> {
    return this.http.get<ResidentsResponse>(`${baseUrl}/get-residents`);
  }

  createResident(
    resident: CreateResident,
  ): Observable<ResidentCreatedResponse> {
    return this.http.post<ResidentCreatedResponse>(
      `${baseUrl}/resident`,
      resident,
    );
  }

  patchResident(
    resident: UpdateResident,
    id: string,
  ): Observable<ResidentCreatedResponse> {
    return this.http.patch<ResidentCreatedResponse>(
      `${baseUrl}/resident/${id}`,
      resident,
    );
  }

  runRaffle(): Observable<RaffleResult> {
    return this.http.post<RaffleResult>(`${baseUrl}/raffle`, {});
  }

  getLatestRaffle(): Observable<RaffleResult> {
    return this.http.get<RaffleResult>(`${baseUrl}/latest-raffle`);
  }
}
