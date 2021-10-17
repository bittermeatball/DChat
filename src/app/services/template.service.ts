import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppService } from '../core/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends AppService {
  constructor(
    @Inject('API_URL') private baseUrl = '',
    private http: HttpClient,
  ) {
    super('templates', http, baseUrl)
  }
}
