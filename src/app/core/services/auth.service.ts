import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, tap, map } from "rxjs";
import { of, Observable, throwError } from "rxjs";
import { environment } from '../../../environments/environment';
import { CustomerAccount } from "../store/auth/auth.models";

@Injectable({providedIn: 'root'})
export class AuthService {
    private api = `/auth`;

    private useMock = true;

    private mockUser = {
        email: 'test',
        password: '123456',
        token: 'mock-jwt-token'
    };

    private mockProfile: CustomerAccount = {
        id: 'user-1',
        email: 'testuser@example.com',
        status: 'active',
        createdAt: new Date().toISOString()
    };

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<boolean> {
        if (this.useMock) {
            const ok = email === this.mockUser.email && password === this.mockUser.password;
            if (!ok) {
                return of(false).pipe(
                    delay(500),
                    tap(() => {throw new Error('ユーザー名またはパスワードが違います');})
                );
            }
            return of(true).pipe(
                delay(500),
                tap(() => {
                    localStorage.setItem('access_token', this.mockUser.token);
                    localStorage.setItem('profile', JSON.stringify(this.mockProfile));
                })
            );
        }　else {
            return this.http
            .post<{ token: string; user: CustomerAccount }>(
                `${environment.apiUrl}/auth/login`,
                { email, password }
            )
            .pipe(
                tap(res => {
                    localStorage.setItem('access_token', res.token),
                    localStorage.setItem('profile', JSON.stringify(res.user));
                }),
                map(() => true)
            );
        }
        
    }

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('profile');
    }

    get isLoggedIn(): boolean {
        return !!localStorage.getItem('access_token');
    }

    getProfile(): Observable<CustomerAccount> {
        if (this.useMock) {
            return of(this.mockProfile).pipe(delay(300));
        } else {
            return this.http.get<CustomerAccount>(`${environment.apiUrl}/auth/profile`).pipe(
                tap(profile => {
                    localStorage.setItem('profile', JSON.stringify(profile));
                })
            );
        }
    }

    /**
     * ログイン直後などに同期的にプロフィール取得したい
     */
    getProfileSync(): CustomerAccount {
        const json = localStorage.getItem('profile');
        if (!json) {
            throw new Error('プロフィールが取得できません');
        }
        return JSON.parse(json) as CustomerAccount;
    }
}