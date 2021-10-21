import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { ContractModule } from './modules/contract/contract.module';
import { TemplateModule } from './modules/template/template.module';
import { contractReducer } from './store/contract/contract.reducer';
import { templateReducer } from './store/template/template.reducer';
import { appReducer } from './store/app.reducer';
import { ContractEffects } from './store/contract/contract.effects';
import { NetworkInterceptor } from './core/interceptors/network.interceptor';
import { TemplateService } from './services/template.service';
import { ContractService } from './services/contract.service';

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
    TemplateModule,
    StoreModule.forRoot({ app: appReducer, contracts: contractReducer, templates: templateReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ContractEffects]),
  ],
  providers: [
    TemplateService,
    ContractService,
    { provide: "API_URL", useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
