import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from './auth.service';
import {EventsService} from './events.service';
import {AuthGuard} from './auth.guard'
import {TokenIntercepterService} from './token-intercepter.service'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    SpecialEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService,EventsService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenIntercepterService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
