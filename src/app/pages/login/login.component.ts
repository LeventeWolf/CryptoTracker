import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {delay} from "../../app.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean;
  error: string | null;
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService ) {
    this.submitted = false;
    this.error = null;
    this.loading = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {return this.loginForm.controls;}

  async onSubmit() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.error('Invalid form!');
      await delay(1000);
      this.loading = false;
      return;
    }

    // If everything fine, login and redirect
    this.authService.login(this.form['email'].value, this.form['password'].value)
      .then(_ => {
        this.router.navigateByUrl('/');
      })
      .catch(async error => {
        await delay(1000);
        this.submitted = false;
        this.loading = false;
        this.error = errors[error.code];
        console.log(error.code)
      })

  }
}

const errors: any = {
  'auth/wrong-password': 'Invalid username or password',
  'auth/invalid-email': 'Invalid username or password',
}
