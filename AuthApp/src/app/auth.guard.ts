import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private _auth:AuthService,private _router:Router)
  {

  }
  canActivate() : boolean 
  {
    if(this._auth.loggedIn()){
      //console.log(this._auth.loggedIn());
      return true;
    }
    else{
      this._router.navigate(['/login']);
      return false;
    }
  }
}
