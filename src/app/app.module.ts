import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/templates/footer/footer.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { StudentFormComponent } from './modals/student-form/student-form.component';
import { FormsModule } from '@angular/forms';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { PreviewComponent } from './preview/preview.component';
import { authGuard } from './guards/auth.guard';
import { loginInterceptorProvider } from './interceptors/login.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorModalComponent,
    StudentFormComponent,
    TextButtonComponent,
    PreviewComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
