import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit, AfterViewInit {
  @ViewChildren('lastPost', { read: ElementRef })
  lastPost!: QueryList<ElementRef>;


  newsfeedPosts: any;
  page: number = 1;
  isValidFileSize: boolean = true;
  newPostContent: string = '';
  base64Image: string = "";
  currentUser = {
    FirstName: '',
    LastName: '',
    Username: '',
    ImageSrc: '',
  };

  constructor(
    private currentUserService: CurrentUserService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.currentUserService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    })
    this.getNewsfeedPosts()
  }

  ngAfterViewInit(): void {
    console.log(this.newsfeedPosts);
  }

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = (fileLoadedEvent: any) => {
        this.base64Image = fileLoadedEvent.target.result;
      }
      reader.readAsDataURL(file);
    }

  }

  resetCreatePost() {
    this.base64Image = '';
    this.newPostContent = '';
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
