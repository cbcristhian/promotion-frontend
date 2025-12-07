import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from './auth-service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject } from '@angular/core';

const baseUrl = environment.baseUrl;

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN',
  };

  const mockAuthResponse: AuthResponse = {
    token: 'fake-token',
    user: mockUser,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        provideHttpClientTesting(),
        {
          provide: '_HttpClient',
          useFactory: () => inject(HttpClient),
        },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login() should authenticate user and update signals', fakeAsync(() => {
    let result: boolean | undefined;

    service
      .login('john@example.com', 'password')
      .subscribe((res) => (result = res));

    const req = httpMock.expectOne(`${baseUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthResponse);

    tick();

    expect(result).toBe(true);
    expect(service.authStatus()).toBe('authenticated');
    expect(service.user()).toEqual(mockUser);
    expect(service.token()).toBe('fake-token');
    expect(service.role()).toBe('ADMIN');
    expect(service.isAdmin()).toBe(true);
    expect(service.isResident()).toBe(false);
  }));

  it('logout() should reset all signals and localStorage', () => {
    // simulate logged in state
    service['_user'].set(mockUser);
    service['_token'].set('fake-token');
    service['_authStatus'].set('authenticated');
    localStorage.setItem('token', 'fake-token');

    service.logout();

    expect(service.user()).toBeNull();
    expect(service.token()).toBeNull();
    expect(service.authStatus()).toBe('not-authenticated');
    expect(service.role()).toBeNull();
    expect(service.isAdmin()).toBe(false);
    expect(service.isResident()).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('checkStatus() should logout if no token exists', fakeAsync(() => {
    let result: boolean | undefined;

    service.checkStatus().subscribe((res) => (result = res));
    tick();

    expect(result).toBe(false);
    expect(service.authStatus()).toBe('not-authenticated');
  }));

  it('checkStatus() should authenticate if token exists and server responds', fakeAsync(() => {
    localStorage.setItem('token', 'fake-token');
    let result: boolean | undefined;

    service.checkStatus().subscribe((res) => (result = res));

    const req = httpMock.expectOne(`${baseUrl}/check-status`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthResponse);

    tick();

    expect(result).toBe(true);
    expect(service.authStatus()).toBe('authenticated');
    expect(service.user()).toEqual(mockUser);
    expect(service.token()).toBe('fake-token');
  }));

  it('computed properties should reflect user role changes', () => {
    expect(service.role()).toBeNull();
    expect(service.isAdmin()).toBe(false);
    expect(service.isResident()).toBe(false);

    service['_user'].set({ ...mockUser, role: 'RESIDENT' });

    expect(service.role()).toBe('RESIDENT');
    expect(service.isAdmin()).toBe(false);
    expect(service.isResident()).toBe(true);
  });
});
