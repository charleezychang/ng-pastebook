import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 user = {
    FirstName: '',
    LastName: '',
    Username: '',
    ImageSrc: '',
  };
  
  constructor(private currentUser: CurrentUserService) { }
  
  ngOnInit(): void {
    this.currentUser.currentUser$.subscribe((user) => {
      this.user = user
    })
  }

  onLogout() {
    this.currentUser.onLogout();
  }
}
