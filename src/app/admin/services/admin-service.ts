import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResidentsResponse } from '../interfaces/resident-response.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  getResidents(): Observable<ResidentsResponse> {
    return this.http.get<ResidentsResponse>(`${baseUrl}/get-residents`);
  }
}
