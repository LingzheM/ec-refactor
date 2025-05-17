import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, tap, map } from "rxjs";
import { of, Observable, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
    private api = `/auth`;

    private useMock = true;

    private mockUser = {
        username: 'test',
        password: '123456',
        token: 'mock-jwt-token'
    };

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<boolean> {
        if (this.useMock) {
            const isValid = username === this.mockUser.username && password === this.mockUser.password;
            if (isValid) {
                return of(true).pipe(
                    delay(500),
                    tap(() => localStorage.setItem('access_token', this.mockUser.token))
                );
            } else {
                return throwError(() => new Error('ユーザー名またはパスワードが違います')).pipe(
                    delay(500)
                );
            }
        }　else {
            return this.http
            .post<{ token: string }>(`${this.api}/login`, { username, password })
            .pipe(
                tap(res => localStorage.setItem('access_token', '')),
                map(() => true)
            );
        }
        
    }

    get isLoggedIn(): boolean {
        return !!localStorage.getItem('access_token');
    }
}