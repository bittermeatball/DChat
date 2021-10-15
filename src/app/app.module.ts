import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { ContractModule } from './contract/contract.module';
import { TemplateModule } from './template/template.module';
import { TemplateService } from 'src/services/template.service';
import { ContractService } from 'src/services/contract.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    ContractModule,
    TemplateModule
  ],
  providers: [
    TemplateService,
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
