import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  frmLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.frmLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    this.router.navigate(['/dashboard']);

    if (this.frmLogin.invalid) {
      return;
    }

    // Call to service
    this.authService
      .login(this.frmLogin.value.email, this.frmLogin.value.password)
      .subscribe((response) => {
        console.log(response);
      });
  }

  showError(field: string, dirty: boolean = false): boolean | undefined {
    const control = this.frmLogin.get(field)!;
    return dirty
      ? control.invalid && (control.dirty || control.touched)
      : control.invalid && control.touched;
  }

  getErrorsFromField(field: string): any {
    return this.frmLogin.get(field)?.errors;
  }
}
