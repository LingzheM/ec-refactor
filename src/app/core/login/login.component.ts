// src/app/core/login/login.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,                     // ← これを入れる
  imports: [
    CommonModule,                       // *ngIf/*ngFor などのため
    ReactiveFormsModule                 // formGroup, formControlName を使うため
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { username: email, password } = this.form.value;
    this.store.dispatch(AuthActions.login({ email, password }));
  }
}
