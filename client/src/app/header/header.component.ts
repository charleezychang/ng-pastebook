import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private currentUser: CurrentUserService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.currentUser.onLogout();
  }
}
