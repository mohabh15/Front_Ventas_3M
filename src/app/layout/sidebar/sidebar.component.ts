import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface MenuItem {
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  // Con ViewChild, obtienes una referencia a la instancia de MatSidenav
  @ViewChild('sidenav') sidenav!: MatSidenav;

   // Esta es la lista de elementos del menú. Puedes cambiarla según tus necesidades.
  public menuItems: MenuItem[] = [
    { title: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { title: 'Ventas', route: '/ventas', icon: 'point_of_sale' },
    { title: 'Productos', route: '/products', icon: 'inventory_2' },
  ];

  // Creamos un método público para alternar el estado del sidenav
  public toggle(): void {
    this.sidenav.toggle();
  }
}