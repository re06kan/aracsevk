import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  tcKimlikNo: string;
  ad: string;
  soyad: string;
  token: string;
  accessToken: string;  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

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

  giris(tcKimlikNo: string, sifre: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/giris`, { tcKimlikNo, sifre })
      .pipe(map(user => {
        user.accessToken = user.token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  cikis() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  kayit(kullanici: any) {
    return this.http.post(`${environment.apiUrl}/auth/kayit`, kullanici);
  }
}
