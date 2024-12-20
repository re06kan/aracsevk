import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      tcKimlikNo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      sifre: ['', Validators.required]
    });
  }

  get f() { 
    return this.loginForm.controls as { [key: string]: any }; 
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.giris(
      this.f['tcKimlikNo'].value,
      this.f['sifre'].value
    ).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: error => {
        this.error = error.error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        this.loading = false;
      }
    });
  }
}
