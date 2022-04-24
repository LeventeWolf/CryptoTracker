import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";

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

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) {
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
      .then((cred: any) => {
        const user: User = {
          id: cred.user?.uid as string,
          uid: cred.user?.uid as string,
          email: this.form['email'].value,
          joinedDate: new Date().toISOString().slice(0, 10)
        };

        this.userService.create(user).then(_ => {
          console.log('User added successfully.');
          this.router.navigateByUrl('/');
        }).catch(error => {
          console.error(error);
        })
      })
      .catch(error => {
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
