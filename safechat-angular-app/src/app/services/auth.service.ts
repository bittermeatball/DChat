import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') baseUrl: string = '',
  ) {
    this._baseUrl = baseUrl
  }

  private _basePath = 'auth';
  private _baseUrl = '';

  getCurrentUser<Auth>(id: string): Observable<Auth> {
    return this.http.get<Auth>(`${this._baseUrl}${this._basePath}/${id}`);
  }
}
