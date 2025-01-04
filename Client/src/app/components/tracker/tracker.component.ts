import { Component } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';

import * as L from "leaflet";
import {take} from "rxjs";

import { TrackerService } from "../../services/tracker.service";
import { UserService } from "../../services/user.service";
import { Location } from "../../model/location";
import { User } from "../../model/user";

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {
  private map: any;

  constructor(private readonly geolocation$: GeolocationService,
              private readonly trackerService: TrackerService,
              private readonly userService: UserService) {

    this.geolocation$.pipe(take(1)).subscribe(position => this.setMarker(position));
  }

  saveLocation () : void {
    console.log("Saving Location");

    const user: User = this.userService.user;

    console.log(user);

    this.geolocation$.pipe(take(1)).subscribe(position => {
      this.trackerService.saveLocation(new Location("", user.uuid, position.coords.latitude, position.coords.longitude, new Date()))
          .subscribe(location => console.log(location));
    });

  }

  setMarker (position: any) : void {
    if (this.map) {
      this.map.setView([position.coords.latitude, position.coords.longitude], 13);
      L.marker([position.coords.latitude, position.coords.longitude]).addTo(this.map);
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('tracker').setView([48.2081, 16.3713], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }
}
