import { Component, input, signal } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-search-employee',
  standalone: true,
  imports: [AutoCompleteModule],
  templateUrl: './search-employee.component.html',
  styleUrl: './search-employee.component.css',
})
export class SearchEmployeeComponent {
  employees = input<any[]>([]);
  filteredEmployees = signal<any[]>([]);

  searchEmployee(event: any) {
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
}
