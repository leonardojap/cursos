import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PATTERN_EMAIL } from '@shared/constants/utils';
import { StudentsService } from '@shared/services/students.service';

@Component({
  selector: 'app-register-students',
  templateUrl: './register-students.component.html',
  styleUrl: './register-students.component.scss',
})
export class RegisterStudentsComponent {
  frmRegister!: FormGroup;

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  selectedCourses: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.frmRegister = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      lastname: [null, [Validators.required, Validators.maxLength(100)]],
      age: [null, [Validators.required]],
      identification: [null, [Validators.required, Validators.maxLength(11)]],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(PATTERN_EMAIL),
        ],
      ],
    });
  }

  /**
   * Validate if the student is older than 18 years old with the date of birth
   */
  isOlder(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && control.value !== null) {
      const date = new Date();
      const year = date.getFullYear();

      const yearOld = new Date(control.value);

      const age = year - yearOld.getFullYear();
      if (age >= 18) {
        return { futureDate: false };
      } else {
        return { futureDate: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.frmRegister.invalid) {
      return;
    }

    // Call to service
    this.studentsService.register(this.frmRegister.value).subscribe((resp) => {
      if (resp) {
        // Show success message
        this.frmRegister.reset();
        this.router.navigate(['/dashboard/estudiantes/listado']);
      }
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
