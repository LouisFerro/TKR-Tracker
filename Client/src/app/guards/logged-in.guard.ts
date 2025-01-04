import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import {UserService} from "../services/user.service";

export const loggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  let result:boolean = inject(UserService).isLoggedIn() && !inject(UserService).isAdmin();
  console.log("shop guard: " + result);
  return result;
};
