import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OrderService {

  products  = [
    {
      id: 1,
      name : 'Producto 1'
    }
  ]

  lastProducts = [
    {
      orderId: 1,
      product:  {
        id: 1,
        name : 'Producto 1'
      },
      currentQuantity: 4
    }
  ]

  employees = [
    {
      id: 1,
      documentNumber: '11111',
      typeDocument: 'DNI',
      name: 'Luisa',

    }
  ]

  findAllProducts() {
    return of(this.products)
  }

  findAllEmployees() {
    return of(this.employees)
  }

  findLatestProductMerchandise() {
    return of(this.lastProducts)
  }

}
