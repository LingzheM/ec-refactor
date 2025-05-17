import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync } from "@angular/router";
import { TwoFactorService } from "../services/two-factor.servicce";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TwoFactorGuard implements CanActivate {
    constructor(
        private twoFactor: TwoFactorService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.twoFactor.isEnabledSync()) {
            this.router.navigate(['/2fa-setup'], {
                queryParams: { returnUrl: state.url }
            });
            return false;
        }
        return true;
    }

    
}