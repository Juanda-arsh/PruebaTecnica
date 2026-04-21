import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarFilters, CarRequest, CarResponse } from '../models/car.models';

@Injectable({ providedIn: 'root' })
export class CarService {
  constructor(private readonly http: HttpClient) {}

  getCars(filters: CarFilters = {}): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>(`${environment.apiBaseUrl}/cars`, {
      params: this.toParams(filters)
    });
  }

  getCar(id: string): Observable<CarResponse> {
    return this.http.get<CarResponse>(`${environment.apiBaseUrl}/cars/${id}`);
  }

  createCar(payload: CarRequest): Observable<CarResponse> {
    return this.http.post<CarResponse>(`${environment.apiBaseUrl}/cars`, payload);
  }

  updateCar(id: string, payload: CarRequest): Observable<CarResponse> {
    return this.http.put<CarResponse>(`${environment.apiBaseUrl}/cars/${id}`, payload);
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/cars/${id}`);
  }

  private toParams(filters: CarFilters): HttpParams {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return params;
  }
}
