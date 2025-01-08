import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.component.html',
  styleUrls: ['./kayit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class KayitComponent implements OnInit {
  kayitForm: FormGroup;
  kayitError: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.kayitForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      ad: ['', [Validators.required]],
      soyad: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.kayitForm.valid) {
      this.isLoading = true;
      this.kayitError = '';

      const userData = this.kayitForm.value;

      // Kayıt işlemi için backend metodu eklenecek
      // Şimdilik console log ile gösterelim
      console.log('Kayıt verisi:', userData);
      
      this.isLoading = false;
      this.router.navigate(['/giris']);
    }
  }

  // Form kontrol metodları
  get username() { return this.kayitForm.get('username'); }
  get ad() { return this.kayitForm.get('ad'); }
  get soyad() { return this.kayitForm.get('soyad'); }
  get password() { return this.kayitForm.get('password'); }
  get role() { return this.kayitForm.get('role'); }
}
