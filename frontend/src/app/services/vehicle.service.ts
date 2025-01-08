import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Vehicle } from '../models/vehicle.model';
import { AuthService } from './auth.service';

export interface VehicleStats {
  total: number;
  ready: number;
  onDuty: number;
  longRoute: number;
  standby: number;
}

interface RawVehicle {
  plate: string;
  brand: string;
  model: string;
  status: 'MUSAIT' | 'GOREVDE' | 'UZUN_YOLDA' | 'KADEMEDE';
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.apiUrl + '/vehicles';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log('Token for vehicle request:', token);
    
    if (!token) {
      console.error('No token found. Please login again.');
      // Kullanıcıyı login sayfasına yönlendirebilirsiniz
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private mapToVehicle(rawVehicle: RawVehicle): Vehicle {
    console.log('Mapping raw vehicle:', rawVehicle);
    return {
      plate: rawVehicle.plate,
      brand: rawVehicle.brand,
      model: rawVehicle.model,
      status: rawVehicle.status
    };
  }

  getVehicles(): Observable<Vehicle[]> {
    console.log('Fetching vehicles from:', this.apiUrl);
    console.log('Current token:', this.authService.getToken());
    
    return this.http.get<RawVehicle[]>(this.apiUrl, { 
      headers: this.getHeaders(),
      observe: 'response'  // Tam yanıtı almak için
    }).pipe(
      map(response => {
        console.log('Full response:', response);
        return response.body || [];
      }),
      map(vehicles => vehicles.map(this.mapToVehicle)),
      tap(vehicles => console.log('Fetched vehicles:', vehicles)),
      catchError(error => {
        console.error('Vehicle fetch error:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: this.apiUrl,
          headers: error.headers
        });
        // Hata durumunda boş array döndür
        return of([]);
      })
    );
  }

  getVehicleStats(): Observable<VehicleStats> {
    console.log('Fetching vehicle stats from:', this.apiUrl + '/stats');
    return this.http.get<VehicleStats>(this.apiUrl + '/stats', { 
      headers: this.getHeaders() 
    }).pipe(
      tap(stats => console.log('Vehicle stats:', stats)),
      catchError(error => {
        console.error('Vehicle stats error:', error);
        // Hata durumunda default istatistikler
        return of({
          total: 0,
          ready: 0,
          onDuty: 0,
          longRoute: 0,
          standby: 0
        });
      })
    );
  }
}
