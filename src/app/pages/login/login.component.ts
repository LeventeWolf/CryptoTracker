import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService ) {
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
    // if (!(this.form['username'].value === 'asd' && this.form['password'].value === 'asd')) {
    //   console.error('Invalid username or password!');
    //   return;
    // }


    // If everything fine, login and redirect
    this.authService.login(this.form['username'].value, this.form['password'].value)
      .then(cred => {
        console.log('login ok!');
        console.log(cred);
        this.router.navigateByUrl('/');
      })
      .catch(error => {
        this.submitted = false;
        console.log(error);
      })

  }
}
