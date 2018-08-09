import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AngularFireDatabase } from 'angularfire2/database';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

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
}
