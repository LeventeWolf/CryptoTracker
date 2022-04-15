import {Component, OnInit} from '@angular/core';
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
  error: string | null;
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.error = null;
    this.submitted = false;
    this.loading = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }

    // If passwords match
    if (this.form['password'].value !== this.form['re_password'].value) {
      console.error('Passwords don\'t match!');
      this.loading = false;
      return;
    }

    // If everything fine, login and redirect
    this.authService.register(this.form['email'].value, this.form['password'].value)
      .then(_ => {
          this.router.navigateByUrl('/');
      }).catch(error => {
          this.error = errors[error.code];
          this.loading = false;
          this.submitted = false;
    });

  }
}


const errors: any = {
  'auth/weak-password': 'Password must be minimum 6 characters',
  'auth/invalid-email': 'Email is not valid!',
  'auth/email-already-in-use': 'This email is already taken'
}
