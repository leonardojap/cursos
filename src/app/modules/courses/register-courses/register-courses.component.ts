import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '@shared/services/courses.service';

@Component({
  selector: 'app-register-courses',
  templateUrl: './register-courses.component.html',
  styleUrl: './register-courses.component.scss',
})
export class RegisterCoursesComponent implements OnInit {
  frmRegister!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.frmRegister = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.frmRegister.invalid) {
      return;
    }

    this.coursesService
      .register(this.frmRegister.value)
      .subscribe((response) => {
        if (response) {
          this.router.navigate(['/dashboard/cursos/listado']);
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
