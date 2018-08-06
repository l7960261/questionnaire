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

const facebookCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Facebook,
  customConfig: {
    scopes: ['email']
    // customParameters: {
    //   // Forces password re-entry.
    //   auth_type: 'reauthenticate'
    // }
  }
};

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [facebookCustomConfig, AuthProvider.Phone, AuthProvider.Password],
  method: AuthMethods.Popup,
  credentialHelper: CredentialHelper.AccountChooser,
  autoUpgradeAnonymousUsers: true,
  disableSignInSuccessCallback: true
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    FirebaseUIModule
  ],
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
      providers: []
    };
  }
}
