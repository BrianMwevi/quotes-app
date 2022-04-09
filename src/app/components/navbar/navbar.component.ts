import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.afAuth.user.subscribe((user) => (this.user = user));
  }

  logout(): void {
    this.userService.logout()
  }
}
