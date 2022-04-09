import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  @ViewChild('signupForm') signupForm: any;
  @ViewChild('loginForm') loginForm: any;
  isLoginForm: boolean = true;
  user: User = {
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  onSignup({ value, valid }: NgForm) {
    if (valid) {
      this.usersService
        .signup(this.user)
        .then((result) => {
          this.log('Account created successfully!', 'alert-success');
          this.signupForm.reset();
          this.isLoginForm = true;
        })
        .catch((err) => {
          this.log(err, 'alert-danger');
        });
    } else {
      return this.log(
        'Please fill the form correctly and submit again',
        'alert-danger'
      );
    }
  }

  onLogin({ value, valid }: NgForm) {
    if (valid) {
      // Form is valid
      this.usersService
        .login(this.user.email, this.user.password)
        .then((result) => {
          this.log('Logged in successfully!', 'alert-success');
          this.router.navigate(['/quote/add']);
        })
        .catch((err) => this.log(err.message, 'alert-danger'));
    } else {
      // Form is invalid
      return this.log(
        'Please fill the form correctly and submit again',
        'alert-danger'
      );
    }
  }

  log(message: string, style: string) {
    this.flashMessage.show(message, {
      cssClass: style,
      timeout: 5000,
    });
  }
}
