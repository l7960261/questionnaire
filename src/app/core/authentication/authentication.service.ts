import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { User } from 'firebase';
import { fromPromise } from 'rxjs/internal-compatibility';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {}

  user() {
    return this.afAuth.user.pipe(
      mergeMap((signInData: User) => {
        if (!signInData) {
          return of(null);
        }

        const userRef = this.afDb.database.ref('/users/' + signInData.uid);

        return fromPromise(userRef.once('value'))
          .pipe(
            map(
              snapshot =>
                snapshot.val() || {
                  displayName: signInData.displayName,
                  email: signInData.email,
                  phoneNumber: signInData.phoneNumber,
                  uid: signInData.uid,
                  photoURL: signInData.photoURL
                }
            )
          )
          .pipe(catchError(error => of(`Error: ${error}`)));
      })
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  setUser(user: IUser) {
    this.afDb.database.ref('users/' + user.uid).set(user);
  }
}

export interface IUser {
  displayName: string;
  email: string;
  phoneNumber: string;
  uid: string;
  photoURL: string;
  profile: string;
}
