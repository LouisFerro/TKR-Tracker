import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withDebugTracing} from '@angular/router';

import { routes } from './app.routes';
import {} from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {UserService} from "./_services/user.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes /*, withDebugTracing()*/ )
    ,importProvidersFrom(HttpClientModule)
//    ,{provide : UserService}
    ,provideAnimations()
  ,{provide: LocationStrategy, useClass: PathLocationStrategy}
    ,{provide: APP_BASE_HREF, useValue: '/'}
  ]
};
