import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';

export class AppService {
  constructor(
    basePath: string = '',
    private _http: HttpClient,
    @Inject('API_URL') baseUrl: string = '',
  ) {
    this._basePath = basePath
    this._baseUrl = baseUrl
  }

  private _basePath = '';
  private _baseUrl = '';

  getMany<T>(): Observable<T[]> {
    return this._http.get<T[]>(this._baseUrl + this._basePath);
  }

  getOne<T>(id: string): Observable<T> {
    return this._http.get<T>(`${this._baseUrl}${this._basePath}/${id}`);
  }

  createMany<T>(item: T): Observable<T> {
    return this._http.post<T>(this._baseUrl + this._basePath, item);
  }

  updateMany<T>(id: string, item: T): Observable<T> {
    return this._http.put<T>(`${this._baseUrl}${this._basePath}/${id}`, item);
  }

  deleteMany<T>(id: string): Observable<T> {
    return this._http.delete<T>(`${this._baseUrl}${this._basePath}/${id}`);
  }
}
