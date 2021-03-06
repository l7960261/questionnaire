import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AngularFireDatabase } from '@angular/fire/database';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { combineLatest, interval, of } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private afDb: AngularFireDatabase) {}

  read(uid: string, organizer: string) {
    const surveyRef = this.afDb.database.ref('/surveys/' + uid + '/' + organizer);

    return fromPromise(surveyRef.once('value'))
      .pipe(map(snapshot => snapshot.val()))
      .pipe(catchError(error => of(`Error: ${error}`)));
  }

  write(data: any, organizer: string) {
    return fromPromise(this.afDb.database.ref('/surveys/' + data.uid + '/' + organizer).set(data)).pipe(
      catchError(error => of(`Error: ${error}`))
    );
  }

  membersTotal() {
    const surveyRef = this.afDb.list('/surveys');

    return surveyRef
      .valueChanges()
      .pipe(
        map(items => {
          const taichung = _.compact(_.map(items, 'taichung'));
          const kaohsiung = _.compact(_.map(items, 'kaohsiung'));
          return _.chain(taichung)
            .concat(kaohsiung)
            .filter(val => val.members)
            .map(val => val.members)
            .sum()
            .value();
        })
      )
      .pipe(switchMap(sum => interval(100).pipe(take(sum + 1))));
  }

  organizer(organizer: string) {
    const surveyRef = this.afDb.list('/surveys');
    const userRef = this.afDb.list('/users');

    return combineLatest(surveyRef.valueChanges(), userRef.valueChanges()).pipe(
      map(latestValues => {
        const [one, two] = latestValues;
        const list = _.compact(_.map(one, organizer));

        return _.chain(list)
          .map(item => {
            const user = _.chain(two)
              .filter(two_item => two_item.uid === item.uid)
              .head()
              .value();
            return _.assign({}, item, user);
          })
          .value();
      })
    );
  }
}
