import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResidentHistoryResult } from '../interfaces/resident-history.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  private http = inject(HttpClient);

  getResidentHistory(): Observable<ResidentHistoryResult> {
    return this.http.get<ResidentHistoryResult>(`${baseUrl}/resident-history`);
  }

  registerForRaffle(): Observable<string> {
    return this.http.patch<string>(`${baseUrl}/register-raffle`, {});
  }
}
