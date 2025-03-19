import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-employee',
  standalone: true,
  imports: [
    FormsModule,
    AutoCompleteModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    
  ],
  templateUrl: './search-employee.component.html',
  styleUrl: './search-employee.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchEmployeeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SearchEmployeeComponent),
      multi: true,
    },
  ],
})
export class SearchEmployeeComponent
  implements ControlValueAccessor, Validator
{
  employees = input<any[]>([]);
  filteredEmployees = signal<any[]>([]);
  selected: any;

  onTouched: () => void = () => {};
  private _value: any;
  private onChange: (_: any) => void = (_: any) => {};
  private control?: AbstractControl;

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  get value(): any {
    return this._value;
  }

  get isNotObject(): boolean {
    return this.control?.value && typeof this.control.value != 'object';
  }

  get isInvalid(): boolean {
    return (
      (!!this.control?.touched && !this.control.value) ||
      typeof this.control?.value != 'object'
    );
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    if (!this.control.value) return null;

    const errors: ValidationErrors = {};

    if (this.control.value && typeof this.control.value != 'object') {
      errors['required'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  onSearchEmployee(event: any): void {
    const filtered: any[] = [];
    const query = event.query;

    for (let i = 0; i < this.employees().length; i++) {
      const employees = this.employees()[i];
      if (employees.fullName.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(employees);
      }
    }

    this.filteredEmployees.set([...filtered]);
  }

  onClear(): void {
    this.value = null;
    this.onChange(this.value);
  }
}
