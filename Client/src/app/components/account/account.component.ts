import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {UserService} from '../../services/user.service';
import {MessageService} from '../../services/message.service';
import {Router} from '@angular/router';

import {User} from '../../model/user';

@Component({
  selector: 'app-account',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})

export class AccountComponent {
  constructor(private userService:UserService, private messageService:MessageService, private router:Router) { }

  user: User = JSON.parse(sessionStorage.getItem('user') ?? '{}');

  authenticationData = new FormGroup({
    username: new FormControl(this.user.username),
    email: new FormControl(this.user.email),
  });

  personalData = new FormGroup({
    firstname: new FormControl(this.user.firstname),
    lastname: new FormControl(this.user.lastname),
    sex: new FormControl(this.user.sex)
  });

  addressData = new FormGroup({
    street: new FormControl(this.user.street),
    postal_code: new FormControl(this.user.postal_code),
    city: new FormControl(this.user.city),
    country: new FormControl(this.user.country)
  });

  onSubmit(): void {
    Object.assign(this.user, {
      username: this.authenticationData.value.username ?? this.user.username,
      email: this.authenticationData.value.email ?? this.user.email,
      firstname: this.personalData.value.firstname ?? this.user.firstname,
      lastname: this.personalData.value.lastname ?? this.user.lastname,
      sex: this.personalData.value.sex ?? this.user.sex,
      street: this.addressData.value.street ?? this.user.street,
      postal_code: this.addressData.value.postal_code ?? this.user.postal_code,
      city: this.addressData.value.city ?? this.user.city,
      country: this.addressData.value.country ?? this.user.country
    });

    this.userService.update(this.user).subscribe({
      next: () => {
        console.log('User updated successfully');
        // Optionally, navigate to another page or show a success message
      },
      error: (err) => {
        console.error('Error updating user:', err);
        // Optionally, show an error message
      }
    });
  }
}
