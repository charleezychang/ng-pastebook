import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {
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

}
