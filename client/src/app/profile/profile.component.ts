import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CurrentUserService } from '../current-user.service';

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
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChildren('lastPost', { read: ElementRef })
  lastPost!: QueryList<ElementRef>;

  newsfeedPosts: any;
  page: number = 1;
  isValidFileSize: boolean = true;
  newPostContent: string = '';
  base64Image: string = "";
  user = {
    FirstName: '',
    LastName: '',
    Username: '',
    ImageSrc: '',
  };

  username: any;
  status: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private currentUser: CurrentUserService) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getStatus(this.username);

    this.currentUser.currentUser$.subscribe((user) => {
      this.user = user
    })

    this.getNewsfeedPosts()
  }

  gAfterViewInit(): void {
    console.log(this.newsfeedPosts);
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

  getNewsfeedPosts() {
    const JWT = localStorage.getItem('JSONWebToken')
    if (JWT) {
      const httpOptions = {
        headers: new HttpHeaders({
          'AuthToken': JWT,
          'Page': JSON.stringify(this.page)
        })
      };
      this.http.get<string>("http://localhost:5000/newsfeedposts", httpOptions)
        .subscribe((newsfeedPosts) => {
          this.newsfeedPosts = newsfeedPosts
        })
    }
  }
}