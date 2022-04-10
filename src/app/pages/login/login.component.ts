import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // TODO redirect to home if already logged in
    this.submitted = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {return this.loginForm.controls;}

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.error('Invalid form!');
      return;
    }

    // If wrong username or password show error
    if (!(this.form['username'].value === 'asd' && this.form['password'].value === 'asd')) {
      console.error('Invalid username or password!');
      return;
    }


    // If everything fine, login and redirect
    console.log('login ok!');
    this.router.navigateByUrl('/');
  }
}
