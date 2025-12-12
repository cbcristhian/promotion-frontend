import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResidentHistory } from '../interfaces/resident-history.interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  private http = inject(HttpClient);

  getResidentHistory(): Observable<ResidentHistory[]> {
    return this.http.get<ResidentHistory[]>(`${baseUrl}/resident-history`);
  }
}
