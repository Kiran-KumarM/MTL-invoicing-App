import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  	
  constructor(private sharedService:SharedService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    let validUser=this.sharedService.isvalidUser()
    if(validUser) return true;
    else{
        this.router.navigateByUrl('login');
        return false;
    }
	
  }
} 