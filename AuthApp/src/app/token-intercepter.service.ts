import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService  implements HttpInterceptor{

  constructor(private _injector:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this._injector.get(AuthService)
    let tokenizedRequest = req.clone({
      setHeaders:{
        Authorization:`Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedRequest)
  }
}
