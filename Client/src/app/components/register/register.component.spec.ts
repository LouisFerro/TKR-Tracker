import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        RegisterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable the submit button when all fields are filled correctly', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const password2Input = fixture.debugElement.query(By.css('input[name="password2"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const email2Input = fixture.debugElement.query(By.css('input[name="email2"]')).nativeElement;

    usernameInput.value = 'username';
    passwordInput.value = 'password';
    password2Input.value = 'password';
    emailInput.value = 'addres@domain.at';
    email2Input.value = 'addres@domain.at';

    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    password2Input.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    email2Input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalse();
  });

  it('should disable the submit button when email and email2 fields are different', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const password2Input = fixture.debugElement.query(By.css('input[name="password2"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const email2Input = fixture.debugElement.query(By.css('input[name="email2"]')).nativeElement;

    usernameInput.value = 'username';
    passwordInput.value = 'password';
    password2Input.value = 'password';
    emailInput.value = 'address@domain.at';
    email2Input.value = 'domain@address.at';

    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    password2Input.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    email2Input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });
});
