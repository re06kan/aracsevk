import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  tcKimlikNo: string;
  ad: string;
  soyad: string;
  role?: 'admin' | 'user' | 'driver';
  accessToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(tcKimlikNo: string, sifre: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/giris`, { tcKimlikNo, sifre }).pipe(
      map(user => {
        // Login başarılı ise
        if (user && user.accessToken) {
          // Kullanıcı bilgilerini local storage'a kaydet
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          // BehaviorSubject'i güncelle
          this.currentUserSubject.next(user);
        }
        return user;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Bilinmeyen bir hata oluştu';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Hata: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Kullanıcı adı veya şifre hatalı';
          break;
        case 403:
          errorMessage = 'Bu işlemi yapmaya yetkiniz yok';
          break;
        case 404:
          errorMessage = 'Kullanıcı bulunamadı';
          break;
        case 500:
          errorMessage = 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
          break;
      }
    }
    
    console.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

  getToken(): string | null {
    const user = this.currentUserValue;
    return user ? user.accessToken || null : null;
  }

  logout() {
    // Local storage'dan kullanıcı bilgilerini temizle
    localStorage.removeItem('currentUser');
    
    // BehaviorSubject'i null olarak güncelle
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getUserRole(): 'admin' | 'user' | 'driver' | null {
    // Backend'den rol bilgisi gelmediği için geçici bir çözüm
    return this.currentUserValue?.tcKimlikNo === '12345678901' ? 'admin' : 'user';
  }
}
