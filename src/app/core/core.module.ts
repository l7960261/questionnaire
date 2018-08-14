import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthenticationService } from './authentication/authentication.service';
import { SurveyService } from './survey/survey.service';
import { MessageService } from './message/message.service';
import { MenuService } from './menu/menu.service';

const facebookCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Facebook,
  customConfig: {
    scopes: ['email', 'user_link']
    // customParameters: {
    //   // Forces password re-entry.
    //   auth_type: 'reauthenticate'
    // }
  }
};

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [facebookCustomConfig],
  method: AuthMethods.Redirect,
  credentialHelper: CredentialHelper.AccountChooser,
  autoUpgradeAnonymousUsers: true
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  exports: [AngularFireModule, AngularFireAuthModule, AngularFireDatabaseModule, FirebaseUIModule],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AuthenticationService, SurveyService, MessageService, MenuService]
    };
  }
}
