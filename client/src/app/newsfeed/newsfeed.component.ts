import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit, AfterViewInit {
  @ViewChildren('lastPost', { read: ElementRef })
  lastPost!: QueryList<ElementRef>;


  newsfeedPosts: any = [];
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
  observer: any;

  constructor(
    private currentUserService: CurrentUserService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.currentUserService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    })
    this.getNewsfeedPosts()
    this.intersectionObserver()
  }

  ngAfterViewInit(): void {
    this.lastPost.changes.subscribe((d) => {
      if (d.last) this.observer.observe(d.last.nativeElement)
    })
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
    this.spinner.show()
    const JWT = localStorage.getItem('JSONWebToken')
    if (JWT) {
      const httpOptions = {
        headers: new HttpHeaders({
          'AuthToken': JWT
        })
      };
      this.http.get<string>(`http://localhost:5000/newsfeedposts/${this.page}`, httpOptions)
        .subscribe((newsfeedPosts) => {
          this.spinner.hide()
          this.newsfeedPosts = [...this.newsfeedPosts, ...newsfeedPosts]
        })
    }
  }

  intersectionObserver() {
    let options = {
      root: null,
      threshold: 0.5,
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.page++;
        this.getNewsfeedPosts()
      }
    }, options)
  }
}
