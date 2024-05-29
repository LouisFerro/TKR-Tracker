import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import {UserService} from "../_services/user.service";

export const loggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  let res:boolean = inject(UserService).isLoggedIn() && !inject(UserService).isAdmin();
  console.log("shop guard: " + res);
  return res;
};
