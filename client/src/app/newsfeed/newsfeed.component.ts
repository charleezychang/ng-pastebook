import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  isValidFileSize: boolean = true;
  newPostContent: string = '';
  base64Image: string = "";
  currentUser = {
    FirstName: '',
    LastName: '',
    Username: '',
    ImageSrc: '',
  }; 

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.currentUserService.currentUser$.subscribe((user) => {
      this.currentUser = user;
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

  resetCreatePost(){
    this.base64Image = '';
    this.newPostContent = '';
  }
}
