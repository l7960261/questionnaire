import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const surveyEmail = functions.database.ref('/surveys/{uid}/{organizer}').onWrite((change, context) => {
  console.log('Survey by: ', context.params.uid, ', organizer: ', context.params.organizer);
  console.log('Value: ', change.after.val());

  return Promise.resolve();
});
