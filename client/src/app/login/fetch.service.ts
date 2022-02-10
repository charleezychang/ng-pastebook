import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient, private router: Router) { }

  postLogin(data: any) {
    return this.http.post<string>("http://localhost:5000/login", data)
    .pipe(map((res:any) => {

      // this.router.navigateByUrl("/");
    console.log("hey")

      console.log(res)
      return res;
    }))
  }

}
