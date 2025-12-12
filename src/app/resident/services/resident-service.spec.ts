import { TestBed } from '@angular/core/testing';
import { ResidentService } from './resident-service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('ResidentService', () => {
  let service: ResidentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResidentService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ResidentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve resident history', () => {
    const mockHistory = [
      {
        executedAt: '2025-12-12T18:11:13.345Z',
        residentId: '03af2112-66d9-405f-87c1-3c4cc03305fb',
        name: 'residente2',
        apartmentNumber: 2,
        parkingSpotId: 'P2',
      },
      {
        executedAt: '2024-01-01T10:00:00.000Z',
        residentId: '03af2112-66d9-405f-87c1-3c4cc03305fb',
        name: 'residente2',
        apartmentNumber: 2,
        parkingSpotId: 'P1',
      },
    ];

    service.getResidentHistory().subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(mockHistory);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/resident-history`);
    expect(req.request.method).toBe('GET');

    req.flush(mockHistory);
  });
});
