import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/html'
    }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient, private router: Router) { }

  postLogin(data: any) {
    return this.http.post<string>("http://localhost:5000/login", data,  this.httpOptions)   
  }

}
