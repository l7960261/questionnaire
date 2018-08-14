import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';

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
          result.timestamp = moment().unix() * -1;
          delete result.uid;

          return fromPromise(messageRef.set(result));
        })
      )
      .pipe(catchError(error => of(`Error: ${error}`)));
  }

  getList() {
    return this.afDb
      .list<IMessage>('/messages', ref => ref.orderByChild('timestamp'))
      .valueChanges()
      .pipe(
        map(item =>
          _.flatten(
            item.map(val => {
              const result = [];
              const base = {
                displayName: val.displayName,
                photoURL: val.photoURL || '/assets/images/music.svg',
                date: moment.unix(val.timestamp * -1).format('YYYY/MM/DD HH:mm:ss'),
                message: '已填寫',
                profile: val.profile || ''
              };

              if (val.message.kaohsiung) {
                result.push(Object.assign({}, base, { message: val.message.kaohsiung }));
              }

              if (val.message.taichung) {
                result.push(Object.assign({}, base, { message: val.message.taichung }));
              }

              if (result.length === 0) {
                result.push(Object.assign({}, base));
              }

              return result;
            })
          )
        )
      );
  }
}

interface IMessage {
  displayName: string;
  email: string;
  message: { taichung?: string; kaohsiung?: string };
  phoneNumber: string;
  photoURL: string;
  timestamp: number;
  profile: string;
}
