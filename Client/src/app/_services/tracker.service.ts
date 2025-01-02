import { Injectable, Optional, SkipSelf } from '@angular/core';
import {catchError, Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";

import { ConfigService } from "./config.service";

import { Location } from "../_model/location";

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  constructor(private http: HttpClient, private configService:ConfigService) { }

  saveLocation(location: Location) : Observable<Location> {
    console.log(location);

    const observable:Observable<Location> = this.http.post<Location>(this.configService.serverUrl + "/users/location/", location)
      .pipe(catchError(this.configService.handleError<Location>("post", new Location())));

    return observable;
  }
}
