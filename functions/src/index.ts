import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const surveyDetect = functions.database.ref('/surveys/{uid}/{organizer}').onWrite((change, context) => {
  console.log('Survey by: ', context.params.uid, ', organizer: ', context.params.organizer);
  console.log('Value: ', change.after.val());

  return Promise.resolve();
});

export const userDetect = functions.database.ref('/users/{uid}').onCreate((snapshot, context) => {
  const original = snapshot.val();
  console.log('Add: ', context.params.uid);
  console.log('Value: ', original);

  return Promise.resolve();
});
