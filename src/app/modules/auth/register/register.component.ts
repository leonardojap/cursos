import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATTERN_EMAIL, RENAME_VALIDATOR_ERROR } from '@shared/constants/utils';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  frmRegister!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.frmRegister = this.formBuilder.group(
      {
        name: [null, [Validators.required, Validators.maxLength(100)]],
        lastname: [null, [Validators.required, Validators.maxLength(100)]],
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            Validators.pattern(PATTERN_EMAIL),
          ],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.maxLength(30),
            Validators.minLength(8),
            RENAME_VALIDATOR_ERROR(Validators.pattern(/\d/), 'oneNumber'),
            RENAME_VALIDATOR_ERROR(Validators.pattern(/[a-zA-Z]/), 'oneLetter'),
            RENAME_VALIDATOR_ERROR(
              Validators.pattern(/[^a-zA-Z0-9]/),
              'oneSpecialCharacter'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          (formGroup: FormGroup) => {
            const password = formGroup.get('password')?.value;
            const confirmPassword = formGroup.get('confirmPassword')?.value;
            return password === confirmPassword ? null : { notSame: true };
          },
        ],
      }
    );
  }

  onSubmit() {
    if (this.frmRegister.invalid) {
      return;
    }

    let data = this.frmRegister.value;
    delete data.confirmPassword;
    // Call to service
    this.authService.register(data).subscribe((resp) => {
      if (resp) {
        this.frmRegister.reset();
        this.router.navigate(['/login']);
      }
    });
  }

  showError(field: string, dirty: boolean = false): boolean | undefined {
    const control: any = this.frmRegister.get(field)!;
    return dirty
      ? control.invalid && (control.dirty || control.touched)
      : control.invalid && control.touched;
  }

  getErrorsFromField(field: string): any {
    return this.frmRegister.get(field)?.errors;
  }
}
