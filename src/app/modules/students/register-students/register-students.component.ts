import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PATTERN_EMAIL } from '@shared/constants/utils';
import { AuthService } from '@shared/services/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.data();
  }

  private initForm(): void {
    this.frmRegister = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      yearOld: [null, [Validators.required, this.isOlder]],
      identify: [null, [Validators.required, Validators.maxLength(11)]],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(PATTERN_EMAIL),
        ],
      ],
      courses: [null, [Validators.required]],
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
    this.authService
      .register(this.frmRegister.value.email, this.frmRegister.value.password)
      .subscribe((response) => {
        console.log(response);
      });
  }

  data() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
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

  onItemSelect(item: any) {
    //validate if the item is already in the array
    const index = this.selectedCourses.findIndex(
      (course: any) => course.item_id === item.item_id
    );
    if (index !== -1) {
      return;
    }
    this.selectedCourses.push(item);
    this.frmRegister.get('courses')?.setValue(this.selectedCourses);
  }
  onSelectAll(items: any) {
    this.selectedCourses = [];
    this.selectedCourses = items;
    this.frmRegister.get('courses')?.setValue(this.selectedCourses);
  }
  onItemDeSelect(item: any) {
    const index = this.selectedCourses.findIndex(
      (course: any) => course.item_id === item.item_id
    );
    if (index !== -1) {
      this.selectedCourses.splice(index, 1);
    }
    this.frmRegister.get('courses')?.setValue(this.selectedCourses);
  }
}
