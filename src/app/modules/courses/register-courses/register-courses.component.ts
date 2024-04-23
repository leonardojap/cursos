import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-register-courses',
  templateUrl: './register-courses.component.html',
  styleUrl: './register-courses.component.scss',
})
export class RegisterCoursesComponent {
  frmRegister!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.frmRegister = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(50)]],
      time: [null, [Validators.required]],
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
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
