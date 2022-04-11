import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    // TODO redirect to home if already logged in
    this.submitted = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
    });
  }

  get form() {return this.registerForm.controls;}

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.error('Invalid form!');
      return;
    }

    // If username already exists
    // TODO check for users

    // If passwords match
    if (this.form['password'].value !== this.form['re_password'].value) {
      console.error('Passwords don\'t match!');
      return;
    }

    // If everything fine, login and redirect
    this.authService.register(this.form['username'].value, this.form['password'].value)
      .then(creds => {
        console.log('register ok!');
        console.log(creds)
        this.router.navigateByUrl('/login');
    }).catch(error => {
      console.log(error)
    });

  }

}
