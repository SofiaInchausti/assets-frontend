import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Developer } from '../../app/models/developer/developer';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllDevelopers(): Observable<Developer[]> {
    let completeUrl = this.url + 'developers';
    return this.http.get<Developer[]>(completeUrl);
  }

  getDeveloper(id: number): Observable<Developer> {
    let completeUrl = this.url + 'developers/' + id;
    return this.http.get<Developer>(completeUrl);
  }

  putDeveloper(form: Developer): Observable<any> {
    let completeUrl = this.url + 'developers/' + form.id;
    return this.http.put<any>(completeUrl, form);
  }

  deleteDeveloper(id: string): Observable<any> {
    const endpoint = `${this.url}developers/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<Response>(endpoint, options);
  }

  postDeveloper(form: Developer): Observable<Response> {
    let completeUrl = this.url + 'developers';
    return this.http.post<Response>(completeUrl, form);
  }
}
