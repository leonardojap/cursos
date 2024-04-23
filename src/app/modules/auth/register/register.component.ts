import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private authService: AuthService
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

    // Call to service
    this.authService
      .register(this.frmRegister.value.email, this.frmRegister.value.password)
      .subscribe((response) => {
        console.log(response);
      });
  }

  showError(field: string, dirty: boolean = false): boolean | undefined {
    const control = this.frmRegister.get(field)!;
    return dirty
      ? control.invalid && (control.dirty || control.touched)
      : control.invalid && control.touched;
  }

  getErrorsFromField(field: string): any {
    return this.frmRegister.get(field)?.errors;
  }
}
