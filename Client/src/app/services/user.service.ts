import {Injectable, Optional, SkipSelf} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../model/user";
import {MessageService} from "./message.service";
import {ConfigService} from "./config.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : User = new User();
  constructor(private http: HttpClient, private messageService:MessageService,
              private configService:ConfigService, private router:Router,
              @Optional() @SkipSelf() sharedService?:UserService) {
    if (sharedService){
      throw new Error("UserService already loaded.");
      console.log("UserService already loaded.")
    }
    else console.log("UserService constructed.")
  }

  isLoggedIn () : boolean {
    const session: string = sessionStorage.getItem('user') ?? "";

    if(session != "") {
      this.user.username = session;
      this.user.isLoggedIn = true;
    }

    console.log(this.user.username + " is logged in: " + this.user.isLoggedIn);

    return this.user.isLoggedIn;
  }

  isAdmin () : boolean {
    console.log(this.user.username + "is admin: " + this.user.isAdmin)
    return this.user.isAdmin == true;
  }

  login (username:string, password:string):Observable<User>{
    this.user.username = username;
    this.user.password = password;
    sessionStorage.setItem('user', JSON.stringify(this.user));
    return this.http.post<User>(this.configService.serverUrl + "/users/login/",this.user)
      .pipe(catchError(this.configService.handleError<User>('login',undefined)),
        tap((user) =>
        {
          if (user != null) {
            this.user = user;
            this.user.isLoggedIn = true;
            sessionStorage.setItem('user', JSON.stringify(this.user));
            console.log("+++++ " + JSON.stringify(this.user));
          }
        }));
  }

  register (username:string, password:string, email:string):Observable<number>{
    this.user.username = username;
    this.user.password = password;
    this.user.email = email;

    console.log("service register ::: " + JSON.stringify(this.user));

    let obs:Observable<number> = this.http.post<number>(this.configService.serverUrl + "/users/register/",this.user)
      .pipe(catchError(this.configService.handleError<number>('register',-1)));
    return obs;
  }

  update(user: User): Observable<void> {
    this.user = user;
    console.log("service update user ::: " + JSON.stringify(this.user));
    return this.http.put<void>(this.configService.serverUrl + "/users/update/", this.user)
      .pipe(
        catchError(this.configService.handleError<void>("update")),
        tap(() => {
          sessionStorage.setItem('user', JSON.stringify(this.user));
        })
      );
  }

  logout ():void{
    sessionStorage.clear();

    this.user = new User();
    this.router.navigate(['/']).then();
  }
}
