import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MessageService} from "../../services/message.service";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = JSON.parse(sessionStorage.getItem('user') ?? "{}").username ?? "";
  password = "";
  constructor(private userService:UserService, private messageService:MessageService, private router:Router) {
  }

  @Output() loggedIn = new EventEmitter<User>();
  onLogin():void{
    this.userService.login(this.username, this.password)
      .subscribe((x) => {
        if (x == undefined) this.username = this.password = "";
        else{
          this.loggedIn.emit(x);
        }
      })
  }
}
