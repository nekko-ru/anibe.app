import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Firebase } from '@ionic-native/firebase/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigProvider } from './providers/config.provider';
import * as Sentry from '@sentry/browser';
import { environment } from '../environments/environment';

Sentry.init({
  dsn: 'https://3763f1cfc48e41b391a10055b777f868@sentry.io/1456993'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    console.error(error);
    if (environment.production) {
      Sentry.showReportDialog({ eventId });
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule,
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    ImagePicker,
    ConfigProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
