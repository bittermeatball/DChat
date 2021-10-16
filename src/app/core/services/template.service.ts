import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>('templates');
  }

  getTemplate(id: string): Observable<Template> {
    return this.http.get<Template>(`templates/${id}`);
  }

  createTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>('templates', template);
  }

  updateTemplate(id: string, template: Template): Observable<Template> {
    return this.http.put<Template>(`templates/${id}`, template);
  }

  deleteTemplate(id: string): Observable<Template> {
    return this.http.delete<Template>(`templates/${id}`);
  }
}
