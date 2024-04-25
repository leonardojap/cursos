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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-schedules',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-schedules.component.html',
  styleUrl: './modal-schedules.component.scss',
})
export class ModalSchedulesComponent implements OnInit {
  frmRegister!: FormGroup;
  @Input() id!: number;
  listSchedules: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initForm();
    this.getListSchedules();
  }

  private initForm(): void {
    this.frmRegister = this.formBuilder.group({
      day: [null, [Validators.required]],
      start_hour: [null, [Validators.required]],
      end_hour: [null, [Validators.required]],
      course_id: [this.id],
    });
  }

  onSubmit() {
    if (this.frmRegister.invalid) {
      return;
    }

    this.coursesService
      .createSchedules(this.frmRegister.value)
      .subscribe((response) => {
        this.frmRegister.reset();
        this.getListSchedules();
      });
  }

  getListSchedules() {
    this.coursesService.get(this.id).subscribe((response: any) => {
      this.listSchedules = response.data.schedules;
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  deleteSchedule(id: number) {
    Swal.fire({
      title: 'Desea eliminar el horario',
      text: 'Eliminar horario',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteSchedules(id).subscribe(() => {
          this.getListSchedules();
        });
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
