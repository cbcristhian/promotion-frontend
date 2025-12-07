import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin-service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import {
  ResidentsResponse,
  Resident,
} from '../interfaces/resident-response.interface';
import { environment } from '../../../environments/environment';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET residents from API', () => {
    const mockResidents: Resident[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'RESIDENT',
        apartmentNumber: 'A101',
        registeredForCurrentRaffle: true,
        assignmentHistoryIds: ['raffle-1'],
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'RESIDENT',
        apartmentNumber: 'B202',
        registeredForCurrentRaffle: false,
        assignmentHistoryIds: [],
      },
    ];

    const mockResponse: ResidentsResponse = {
      count: mockResidents.length,
      residents: mockResidents,
    };

    service.getResidents().subscribe((response) => {
      expect(response.count).toBe(2);
      expect(response.residents.length).toBe(2);
      expect(response.residents[0].apartmentNumber).toBe('A101');
    });

    const req = httpMock.expectOne(`${baseUrl}/get-residents`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should propagate HTTP error', () => {
    service.getResidents().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(`${baseUrl}/get-residents`);

    req.flush('Server error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
