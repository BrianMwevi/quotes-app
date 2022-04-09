import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSource.asObservable();
  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.pipe(
      map((auth) =>
        this.isAuthenticatedSource.next(auth !== null ? true : false)
      )
    );
  }

  signup(user: User) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) =>
        result.user?.updateProfile({ displayName: user.username })
      );
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
