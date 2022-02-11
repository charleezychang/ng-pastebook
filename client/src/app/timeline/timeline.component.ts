import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, AfterViewInit{
  @ViewChildren('lastPost', { read: ElementRef })
  lastPost!: QueryList<ElementRef>;


  timelinePosts: any = [];
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
  visitedProfile: string | undefined = "";

  constructor(
    private currentUserService: CurrentUserService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private useParams: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.currentUserService.getCurrentUser();
    this.currentUserService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    })
    this.useParams.paramMap.subscribe(paramMap => {
      console.log(paramMap.get('username'));
      
      this.visitedProfile = paramMap.get('username')?.toString()
    })
    this.getTimelinePosts()
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

  getTimelinePosts() {
    this.spinner.show()
    const JWT = localStorage.getItem('JSONWebToken')
    if (JWT) {
      const httpOptions = {
        headers: new HttpHeaders({
          'AuthToken': JWT
        })
      };
      this.http.get<string>(`http://localhost:5000/timelineposts/${this.visitedProfile}/${this.page}`, httpOptions)
        .subscribe((timelinePosts) => {
          this.spinner.hide()
          this.timelinePosts = [...this.timelinePosts, ...timelinePosts]
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
        this.getTimelinePosts()
      }
    }, options)
  }
}
