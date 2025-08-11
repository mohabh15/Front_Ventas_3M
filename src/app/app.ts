import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavContainer,
    //MatSidenavContent,
    MatSidenavModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Front_Ventas_3M';

  // Usamos @ViewChild para obtener una referencia a la instancia de SidebarComponent
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  public toggleSidenav(): void {
    if (this.sidebar) {
      this.sidebar.toggle();
    }
  }
}


