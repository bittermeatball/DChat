import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../core/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService extends AppService {
  constructor(
    @Inject('API_URL') private baseUrl = '',
    private http: HttpClient,
  ) {
    super('contracts', http, baseUrl)
  }
}
