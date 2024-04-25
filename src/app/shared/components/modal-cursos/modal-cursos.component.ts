import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from '@shared/services/courses.service';

@Component({
  selector: 'app-modal-cursos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-cursos.component.html',
  styleUrl: './modal-cursos.component.scss',
})
export class ModalCursosComponent implements OnInit {
  frmRegister!: FormGroup;
  @Input() id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initForm();
    this.coursesService.get(this.id).subscribe((response: any) => {
      this.frmRegister.patchValue(response.data);
    });
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
      .update(this.id, this.frmRegister.value)
      .subscribe((response) => {
        this.modalService.dismissAll();
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
