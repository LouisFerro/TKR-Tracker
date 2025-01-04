import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter, withDebugTracing} from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {UserService} from "./services/user.service";
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes /*, withDebugTracing()*/),
    importProvidersFrom(HttpClientModule)
    //    ,{provide : UserService}
    ,
    provideAnimations(),
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' }, provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
};
