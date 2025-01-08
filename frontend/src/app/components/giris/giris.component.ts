import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-giris',
  templateUrl: './giris.component.html',
  styleUrls: ['./giris.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class GirisComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';
  isLoading: boolean = false;
  returnUrl: string = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Eğer kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      tcKimlikNo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      sifre: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Giriş öncesi hangi sayfaya gitmek istiyordu onu al
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      const { tcKimlikNo, sifre } = this.loginForm.value;

      this.authService.login(tcKimlikNo, sifre).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          // Kullanıcı rolüne göre yönlendirme
          const role = this.authService.getUserRole();
          
          if (role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate([this.returnUrl]);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = error.message || 'TC Kimlik No veya şifre hatalı';
          console.error('Login error', error);
        }
      });
    }
  }

  // Form kontrol metodları
  get tcKimlikNo() { return this.loginForm.get('tcKimlikNo'); }
  get sifre() { return this.loginForm.get('sifre'); }
}
