import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { MapComponent } from "./components/map/map.component";
import { TrackerComponent } from "./components/tracker/tracker.component";
import { ListComponent } from "./components/list/list.component";
import { loggedInGuard } from "./guards/logged-in.guard";
import {AccountComponent} from './components/account/account.component';

export const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'tracker', component: TrackerComponent, canActivate: [loggedInGuard]},
  {path: 'list', component: ListComponent, canActivate: [loggedInGuard]},
  {path: 'account', component: AccountComponent, canActivate: [loggedInGuard]},
  {path: '', component: MapComponent},
  {path: '**', component: AppComponent},
];
