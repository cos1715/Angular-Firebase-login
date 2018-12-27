import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/user']);
      }, err => console.log(err)
      );
  }

  tryRegister(value) {
    if (value.password === value.repeatPassword) {
      const pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{6,}/g;
      if (pattern.test(value.password)) {
        this.authService.doRegister(value)
          .then(res => {
            console.log(res);
            this.errorMessage = '';
            this.successMessage = 'Your account has been created';
          }, err => {
            console.log(err);
            this.errorMessage = err.message;
            this.successMessage = '';
          });
      } else {
        this.errorMessage = 'Password must have 1 digit 1 uppercase and 1 lowercase letter and min 6 symbols long';
      }
    } else {
      this.errorMessage = 'Passwords doesn\'t match';
    }
  }
}
