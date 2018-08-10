import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private afDb: AngularFireDatabase) {}

  setMessage(uid: string, organizer: string, message: string) {
    const userRef = this.afDb.database.ref('/users/' + uid);
    const messageRef = this.afDb.database.ref('/messages/' + uid);

    return fromPromise(
      messageRef.once('value').then(m_snapshot => {
        const data = Object.assign({}, m_snapshot.val());
        return userRef.once('value').then(u_snapshot => Object.assign(data, u_snapshot.val()));
      })
    )
      .pipe(
        concatMap(value => {
          const result = value;
          result.message = result.message || {};
          result.message[organizer] = message;

          return fromPromise(messageRef.set(result));
        })
      )
      .pipe(catchError(error => of(`Error: ${error}`)));
  }
}
