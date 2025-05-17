import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, Observable, of } from "rxjs";
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface TwoFactorSetup {
    qrCodeUrl: string;
    secret: string;
}

@Injectable({ providedIn: 'root' })
export class TwoFactorService {
    private useMock = true;

    private mockEnabled = false;
    private mockSecret = 'JBSWY3';

    constructor(private http: HttpClient) {}

    /**
     * 2FA セットアップ情報取得
     * @returns 
     */
    setup2FA(): Observable<TwoFactorSetup> {
        if (this.useMock) {
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/MyApp:${localStorage.getItem('profile')}?secret=${this.mockSecret}&issuser=MyApp`;
            return of({ qrCodeUrl, secret: this.mockSecret }).pipe(delay(300));
        }
        return this.http.post<TwoFactorSetup>(`${environment.apiUrl}/2fa/setup`, {});
    }

    /**
     * 2FA　コード認証
     * @param code 
     * @returns 
     */
    verify2FA(code: string): Observable<boolean> {
        if (this.useMock) {
            const ok = code === '123456';
            if (ok) this.mockEnabled = true;
            return of(ok).pipe(delay(300));
        }
        return this.http.post<boolean>(`${environment.apiUrl}/2fa/verify`, { code })
        .pipe(tap(ok => { if (ok) this.mockEnabled = true; }));
    }

    disable2FA(): Observable<void> {
        if (this.useMock) {
            this.mockEnabled = false;
            return of(void 0).pipe(delay(300));
        }
        return this.http.post<void>(`${environment.apiUrl}/2fa/disable`, {});
    }

    isEnabledSync(): boolean {
        return this.mockEnabled;
    }
}