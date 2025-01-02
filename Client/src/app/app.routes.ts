import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { MapComponent } from "./map/map.component";
import { TrackerComponent } from "./tracker/tracker.component";
import { ListComponent } from "./list/list.component";
import { loggedInGuard } from "./_guards/logged-in.guard";
import {AccountComponent} from './account/account.component';

export const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'tracker', component: TrackerComponent, canActivate: [loggedInGuard]},
  {path: 'list', component: ListComponent, canActivate: [loggedInGuard]},
  {path: 'account', component: AccountComponent, canActivate: [loggedInGuard]},
  {path: '', component: MapComponent},
  {path: '**', component: AppComponent},
];
