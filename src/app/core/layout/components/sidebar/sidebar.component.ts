import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../../services';
import { MenuitemComponent } from './menu-item/menu-item.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    RouterModule,
    MenuitemComponent,
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export default class SidebarComponent implements OnInit {
  model: any[] = [];
  layoutService = inject(LayoutService);

  ngOnInit() {
    this.model = [
      {
        label: 'PRINCIPAL',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'ADMINISTRACION',
        items: [
          { label: 'Pedidos', icon: '', routerLink: ['/orders'] },
          { label: 'Ventas', icon: '', routerLink: ['/sales'] },
        ],
      },
      // {
      //   label: 'Pages',
      //   icon: 'pi pi-fw pi-briefcase',
      //   items: [
      //     {
      //       label: 'Landing',
      //       icon: 'pi pi-fw pi-globe',
      //       routerLink: ['/landing'],
      //     },
      //     {
      //       label: 'Auth',
      //       icon: 'pi pi-fw pi-user',
      //       items: [
      //         {
      //           label: 'Login',
      //           icon: 'pi pi-fw pi-sign-in',
      //           routerLink: ['/auth/login'],
      //         },
      //         {
      //           label: 'Error',
      //           icon: 'pi pi-fw pi-times-circle',
      //           routerLink: ['/auth/error'],
      //         },
      //         {
      //           label: 'Access Denied',
      //           icon: 'pi pi-fw pi-lock',
      //           routerLink: ['/auth/access'],
      //         },
      //       ],
      //     },
      //     {
      //       label: 'Crud',
      //       icon: 'pi pi-fw pi-pencil',
      //       routerLink: ['/pages/crud'],
      //     },
      //     {
      //       label: 'Timeline',
      //       icon: 'pi pi-fw pi-calendar',
      //       routerLink: ['/pages/timeline'],
      //     },
      //     {
      //       label: 'Not Found',
      //       icon: 'pi pi-fw pi-exclamation-circle',
      //       routerLink: ['/notfound'],
      //     },
      //     {
      //       label: 'Empty',
      //       icon: 'pi pi-fw pi-circle-off',
      //       routerLink: ['/pages/empty'],
      //     },
      //   ],
      // },
    ];
  }
}
