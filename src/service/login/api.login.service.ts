import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../app/models/login/login';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  login(form: Login): Observable<Response> {
    let direccion = this.url + 'users/login';
    return this.http.post<Response>(direccion, form);
  }
}
