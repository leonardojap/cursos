import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PATTERN_EMAIL } from '@shared/constants/utils';
import { StudentsService } from '@shared/services/students.service';

@Component({
  selector: 'app-modal-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-students.component.html',
  styleUrl: './modal-students.component.scss',
})
export class ModalStudentsComponent implements OnInit {
  frmRegister!: FormGroup;
  @Input() id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initForm();
    this.studentsService.getStudent(this.id).subscribe((response: any) => {
      this.frmRegister.patchValue(response.data);
    });
  }

  private initForm(): void {
    this.frmRegister = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      lastname: [null, [Validators.required, Validators.maxLength(100)]],
      age: [null, [Validators.required, this.isOlder]],
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
    if (control.value < 18) {
      return { isOlder: true };
    }
    return null;
  }

  onSubmit() {
    if (this.frmRegister.invalid) {
      return;
    }

    // Call to service
    this.studentsService
      .updateStudent(this.id, this.frmRegister.value)
      .subscribe((resp) => {
        if (resp) {
          // Show success message
          this.frmRegister.reset();
          this.modalService.dismissAll();
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

  close() {
    this.modalService.dismissAll();
  }
}
