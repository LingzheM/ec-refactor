import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: {returnUrl: state.url}
    });
    return false;
  }
}