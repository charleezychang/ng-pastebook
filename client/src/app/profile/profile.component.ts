import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface CurrentProfileModel {
    Status: string;
    OwnerId: number;
    Username: string;
    Bio: string;
    ImageSrc: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profilePic: string = "../assets/chaeyoung.jpg";
  username: any;
  status: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getStatus(this.username);
  }

  getStatus(username: string) {
    const JWT = localStorage.getItem('JSONWebToken')
    if(JWT) {
      const httpOptions = {
        headers: new HttpHeaders({
          'AuthToken': JWT
        })
      };
      this.http.get<any>(`http://localhost:5000/${username}`, httpOptions)
        .subscribe((res) => {
          this.status = res.Status;
          console.log(this.status)
        })
    }
  }

}
