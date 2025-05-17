import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,                       // *ngIf/*ngFor などのため
    ReactiveFormsModule                 // formGroup, formControlName を使うため
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private au: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  private passwordsMatch(fg: FormGroup) {
    const pw = fg.get('password')!.value;
    const cpw = fg.get('confirmPassword')!.value;
    return pw === cpw ? null : { mismatch: true };
  }

  onSumit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.loading = true;
    this.error = null;
    this.au.register(email, password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: err => {
        this.error = err.message || '登録に失敗しました';
        this.loading = false;
      }
    });
  }
}
