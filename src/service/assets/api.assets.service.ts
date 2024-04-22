import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, tap, throwError } from 'rxjs';
import { Asset } from '../../app/models/asset/asset';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllAssets(): Observable<Asset[]> {
    let completeUrl = this.url + 'assets';
    return this.http.get<Asset[]>(completeUrl);
  }

  getAsset(id: number): Observable<Asset> {
    let completeUrl = this.url + 'assets/' + id;
    return this.http.get<Asset>(completeUrl);
  }

  putAsset(form: Asset): Observable<any> {
    let completeUrl = this.url + 'assets/' + form.id;
    return this.http.put<any>(completeUrl, form);
  }

  deleteAsset(id: string): Observable<any> {
    const endpoint = `${this.url}assets/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.delete<Response>(endpoint, options);
  }

  postAsset(form: Asset): Observable<Response> {
    let completeUrl = this.url + 'assets';
    return this.http.post<Response>(completeUrl, form);
  }
}
