import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './components/templates/footer/footer.component';
import {HeaderComponent} from './components/templates/header/header.component';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorModalComponent} from './modals/error-modal/error-modal.component';
import {StudentFormComponent} from './modals/student-form/student-form.component';
import {TextButtonComponent} from './components/text-button/text-button.component';
import {PreviewComponent} from './preview/preview.component';
import {TokenInterceptor} from "../helpers/token.interceptor";
import {CookieService} from "ngx-cookie-service";
import { SidebarComponent } from './components/templates/sideBar/sidebar.component';
import { AvatarComponent } from './components/templates/avatar/avatar.component';
import { SpinnerComponent } from './loader/spinner/spinner.component';
import {LoaderInterceptor} from "./loader/interceptors/loader.interceptor";
import {LoaderService} from "./loader/loader.service";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorModalComponent,
    StudentFormComponent,
    TextButtonComponent,
    PreviewComponent,
    SidebarComponent,
    AvatarComponent,
    SpinnerComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
    }),
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    LoaderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
