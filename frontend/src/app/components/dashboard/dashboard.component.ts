import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { VehicleService, VehicleStats } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  vehicleStats: VehicleStats = {
    total: 0,
    ready: 0,
    onDuty: 0,
    longRoute: 0,
    standby: 0
  };
  vehicles: Vehicle[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    
    this.fetchVehicles();
    this.fetchVehicleStats();
  }

  fetchVehicles(): void {
    this.loading = true;
    this.error = null;
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.loading = false;
      },
      error: (err) => {
        console.error('Araç listesi yüklenemedi', err);
        this.error = err.message || 'Araçlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        this.loading = false;
      }
    });
  }

  fetchVehicleStats(): void {
    this.vehicleService.getVehicleStats().subscribe({
      next: (stats) => {
        this.vehicleStats = stats;
      },
      error: (err) => {
        console.error('Araç istatistikleri yüklenemedi', err);
        this.error = err.message || 'Araç istatistikleri alınamadı.';
      }
    });
  }

  getVehicleStatusClass(status: string): string {
    switch(status) {
      case 'hazır': return 'ready';
      case 'görevde': return 'on-duty';
      case 'kademede': return 'standby';
      default: return '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/giris']);
  }
}
