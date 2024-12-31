import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SearchEmployeeComponent } from '../../components/search-employee/search-employee.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    ToolbarModule,
    TitlePageComponent,
    SearchEmployeeComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export default class OrderComponent {
  employees = signal<any[]>([
    {
      id: 1,
      name: 'Empleado 1',
      documentNumber: '11111111',
    },
    {
      id: 2,
      name: 'Empleado 2',
      documentNumber: '22222222',
    },
    {
      id: 3,
      name: 'Empleado 3',
      documentNumber: '33333333',
    },
    {
      id: 4,
      name: 'Empleado 4',
      documentNumber: '44444444',
    },
    {
      id: 5,
      name: 'Empleado 5',
      documentNumber: '55555555',
    },
  ]);

  products: any[] = [
    {
      id: 1,
      name: 'Producto 1',
      currentQuantity: 4,
      orderQuantity: 0,
    },
    {
      id: 2,
      name: 'Producto 2',
      currentQuantity: 3,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: 'Producto 3',
      currentQuantity: 2,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: 'Producto 3',
      currentQuantity: 2,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: 'Producto 3',
      currentQuantity: 2,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: 'Producto 3',
      currentQuantity: 2,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: 'Producto 3',
      currentQuantity: 2,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: 'Producto 3',
      currentQuantity: 2,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: 'Producto 3',
      currentQuantity: 2,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: 'Producto 3',
      currentQuantity: 2,
      orderQuantity: 0,
    },
  ];

  employeesMap = this.employees().map((e) => ({
    ...e,
    fullName: `${e.documentNumber} | ${e.name}`,
  }));

  // searchEmployee(event: any) {
  //   const filtered: any[] = [];
  //   const query = event.query;

  //   for (let i = 0; i < this.employeesMap.length; i++) {
  //     const employees = this.employeesMap[i];
  //     if (employees.fullName.toLowerCase().includes(query.toLowerCase())) {
  //       filtered.push(employees);
  //     }
  //   }

  //   this.filteredEmployees = filtered;
  // }
}
