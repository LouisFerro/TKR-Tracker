import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatChipsModule } from "@angular/material/chips";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

import { User } from "./model/user";
import { UserService } from "./services/user.service";
import { MessageService } from "./services/message.service";

import { MessagesComponent } from "./components/messages/messages.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MessagesComponent, ReactiveFormsModule,
    LoginComponent, RegisterComponent, RouterLink,
    MatChipsModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  username = JSON.parse(sessionStorage.getItem('user') ?? "{}").username ?? "";
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
