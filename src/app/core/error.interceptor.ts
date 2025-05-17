import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs";
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err:HttpErrorResponse) => {
                if (err.status === 401) {
                    // 認証エラー時にログイン画面へ
                    this.router.navigate(['/login']);
                }
                //　グローバル通知など追加可能
                return throwError(() => err);
            })
        );
    }
}