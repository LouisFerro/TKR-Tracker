import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MessagesComponent} from "./messages/messages.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserService} from "./_services/user.service";

import {MatChipsModule} from "@angular/material/chips";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {User} from "./_model/user";
import {MessageService} from "./_services/message.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MessagesComponent,
    LoginComponent, RegisterComponent, RouterLink,
    MatChipsModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Shenk's Tracker";
  constructor(public userService:UserService,
              private messageService:MessageService,private router:Router) {
  }
  public loggedIn(u : User){
    this.messageService.add("login successful: " + JSON.stringify(u));
    this.router.navigate(['tracker']).then(r => console.log(r));
  }
  public registered(s : String) {
    this.messageService.add("registered: "+s);
  }
}
