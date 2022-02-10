import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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

  onLogout() {
    this.currentUserService.onLogout();
  }
}
