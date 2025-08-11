import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Sale } from '../../core/models/sale.model';
import { FirebaseService } from '../../core/services/firebase.service';
import { SaleDialogComponent } from './components/sale-dialog/sale-dialog.component';
import { NotificationService } from '../../core/services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, CurrencyPipe, DatePipe, MatCardModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'quantity', 'unitPrice', 'total', 'date', 'actions'];
  dataSource$: Observable<Sale[]>;

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {
    this.dataSource$ = this.firebaseService.getSales();
  }

  ngOnInit(): void {}

  openSaleDialog(sale?: Sale): void {
    const dialogRef = this.dialog.open(SaleDialogComponent, {
      width: '450px',
      data: { sale }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notification.showSuccess(`Venta ${sale ? 'actualizada' : 'añadida'} con éxito`);
      }
    });
  }

  async deleteSale(id: string): Promise<void> {
    if (confirm('¿Estás seguro de que quieres eliminar esta venta?')) {
      try {
        await this.firebaseService.deleteSale(id);
        this.notification.showSuccess('Venta eliminada con éxito');
      } catch (error) {
        this.notification.showError('Error al eliminar la venta');
      }
    }
  }
}
