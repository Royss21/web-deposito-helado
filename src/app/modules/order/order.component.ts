import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FooterActionsComponent } from '../../components/footer-actions/footer-actions.component';
import { SearchEmployeeComponent } from '../../components/search-employee/search-employee.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    ToolbarModule,
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TitlePageComponent,
    SearchEmployeeComponent,
    FooterActionsComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export default class OrderComponent {
  private _fb = inject(FormBuilder);
  private _orderService = inject(OrderService);

  orderForm: FormGroup = this._initForm();
  products = toSignal(this._orderService.findAllProducts());
  employees = toSignal(this._orderService.findAllEmployees());
  filteredProducts = signal<IProductAutocomplete[]>([]);

  constructor() {
    this._addProductsOrder();
  }

  get orderProductsForm(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  get employeeForm(): FormControl {
    return this.orderForm.get('employee') as FormControl;
  }

  get employeesMap() {
    return (
      this.employees()?.map((e) => ({
        ...e,
        fullName: `${e.typeDocument} ${e.documentNumber} - ${e.name}`,
      })) || []
    );
  }

  get saveIsDisabled(): boolean {
    return !this.employeeForm.value || typeof this.employeeForm.value != 'object'
  }

  onConfirmSave() {

    console.log({
      isvalid: this.orderForm.valid,
      formvalue: this.orderForm.getRawValue(),
      form: this.orderForm
    })

  }

  onAddProductToOrder() {
    const product = {
      productId: this.orderProductsForm.length + 1,
      productName: 'Producto ' + new Date().getTime().toString().slice(-5, -1),
      currentQuantity: 0,
    };

    this._addProduct(product);
  }

  onClearProduct(orderProduct: FormGroup): void {
    orderProduct.get('product')?.setValue(null);
  }

  onCancelForm() {
    this.orderForm.reset();
    this.orderForm = this._initForm();
  }

  onSearchProducts(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    const productsForm: IOrderProduct[] = this.orderProductsForm.getRawValue();
    const productsInOrder: any = productsForm.reduce(
      (acc, el) =>
        el.product ? { [el.product.id]: el.product, ...acc } : { ...acc },
      {}
    );
    let products = this.products()!;
    products = products.filter((p) => !productsInOrder[p.id]);

    for (let i = 0; i < products.length; i++) {
      const employees = products[i];
      if (employees.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(employees);
      }
    }

    this.filteredProducts.set([...filtered]);
  }

  onRemoveOrderProduct(orderProduct: FormGroup, index: number) {
    const orderProductValue = orderProduct.getRawValue();
    this.orderProductsForm.removeAt(index);
  }

  private _addProduct(productOrder?: any) {
    const newProduct = this._fb.group({
      orderDetailId: [null],
      orderId: [productOrder?.orderId ?? null],
      product: [productOrder?.product ?? null, Validators.required],
      currentQuantity: [productOrder?.currentQuantity ?? 0],
      orderQuantity: [0, Validators.required],
    });

    this.orderProductsForm.push(newProduct);
  }

  private _addProductsOrder() {
    this._orderService.findLatestProductMerchandise().subscribe((products) => {
      products.forEach((product) => this._addProduct(product));
    });
  }

  private _initForm() {
    return this._fb.group({
      employee: [null, [Validators.required]],
      orderDate: [new Date(), [Validators.required]],
      products: this._fb.array<IOrderProduct>([]),
    });
  }
}

interface IProductAutocomplete {
  id: number;
  name: string;
}

interface IOrderProduct {
  orderDetailId?: number;
  orderId?: number;
  product?: IProductAutocomplete;
  currentQuantity?: number;
  orderQuantity?: number;
}
