import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    
    if (currentUser) {
      // Kullanıcı giriş yapmış
      // Rol kontrolü yapılabilir
      return true;
    }
    
    // Giriş yapılmamış, login sayfasına yönlendir
    this.router.navigate(['/giris'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
}
