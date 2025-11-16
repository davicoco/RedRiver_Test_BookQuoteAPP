import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize registration form with validation rules
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    // Prevent submission if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Call AuthService to register new user
    // AuthService handles token storage and auto-login via tap() operator
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        // Registration successful - user is automatically logged in
        console.log('Du har nu registrerat dig!', response);
        this.router.navigate(['/books']);
      },
      error: (error) => {
        // Display error message to user
        console.error('Registrering misslyckades', error);
        this.errorMessage = error.error?.message || 'Registrering misslyckades. Var god försök igen.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Check if form field has validation errors and has been touched by user
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}