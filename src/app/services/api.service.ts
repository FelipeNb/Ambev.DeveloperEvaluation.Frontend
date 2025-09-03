import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: any): Observable<T> {
    let p = new HttpParams();
    if (params) Object.keys(params).forEach(k => p = p.set(k, params[k]));
    return this.http.get<T>(`${this.base}/${path}`, { params: p });
  }
  post<T>(path: string, body: any): Observable<T> { return this.http.post<T>(`${this.base}/${path}`, body); }
  put<T>(path: string, body: any): Observable<T> { return this.http.put<T>(`${this.base}/${path}`, body); }
  delete<T>(path: string): Observable<T> { return this.http.delete<T>(`${this.base}/${path}`); }
}
