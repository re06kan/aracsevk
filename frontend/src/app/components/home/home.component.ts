import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Mevcut kullanıcıyı al
    this.currentUser = this.authService.currentUserValue;
  }

  getUserInitials(): string {
    if (!this.currentUser) return '';
    
    const ad = this.currentUser.ad || '';
    const soyad = this.currentUser.soyad || '';
    
    return (ad.charAt(0) + soyad.charAt(0)).toUpperCase();
  }

  getUserRoleLabel(): string {
    const role = this.authService.getUserRole();
    switch(role) {
      case 'admin': return 'Yönetici';
      case 'driver': return 'Sürücü';
      case 'user': return 'Kullanıcı';
      default: return 'Tanımsız';
    }
  }

  navigateToDashboard() {
    const role = this.authService.getUserRole();
    if (role === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      // Normal kullanıcı için farklı bir sayfa olabilir
      alert('Bu sayfaya erişim izniniz bulunmamaktadır.');
    }
  }

  navigateToAracTakip() {
    const role = this.authService.getUserRole();
    if (role === 'admin' || role === 'user') {
      this.router.navigate(['/arac-takip']);
    } else {
      alert('Bu sayfaya erişim izniniz bulunmamaktadır.');
    }
  }

  navigateToKullaniciYonetimi() {
    const role = this.authService.getUserRole();
    if (role === 'admin') {
      this.router.navigate(['/kullanici-yonetimi']);
    } else {
      alert('Bu sayfaya erişim izniniz bulunmamaktadır.');
    }
  }

  navigateToRaporlama() {
    const role = this.authService.getUserRole();
    if (role === 'admin') {
      this.router.navigate(['/raporlama']);
    } else {
      alert('Bu sayfaya erişim izniniz bulunmamaktadır.');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/giris']);
  }
}