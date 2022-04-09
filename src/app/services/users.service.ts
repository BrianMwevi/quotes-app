import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/User';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  signup(user: User) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        result.user?.updateProfile({ displayName: user.username });
        this.logout();
      });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  logout() {
    return new Promise<void>((resolve, reject) => {
      this.afAuth
        .signOut()
        .then((result) => {
          resolve(result);
          this.router.navigate(['/account']);
        })
        .catch((err) => resolve(err));
    });
  }
}
