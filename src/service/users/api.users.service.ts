import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Developer } from '../../app/models/developer/developer';
import { User } from '../../app/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    let completeUrl = this.url + 'users';
    return this.http.get<User[]>(completeUrl);
  }

  getUser(id: number): Observable<User> {
    let completeUrl = this.url + 'users/' + id;
    return this.http.get<User>(completeUrl);
  }

  putUser(form: User): Observable<any> {
    let completeUrl = this.url + 'users/' + form.id;
    return this.http.put<any>(completeUrl, form);
  }

  deleteUser(id: string): Observable<any> {
    const endpoint = `${this.url}users/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<Response>(endpoint, options);
  }

  postUser(form: Developer): Observable<Response> {
    let completeUrl = this.url + 'users';
    return this.http.post<Response>(completeUrl, form);
  }
}
