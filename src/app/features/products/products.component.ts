import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { FirebaseService } from '../../core/services/firebase.service';
import { StockDialogComponent } from './components/stock-dialog/Product-dialog.component';
import { NotificationService } from '../../core/services/notification.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    CurrencyPipe
  ],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['name', 'quantity', 'price', 'actions'];
  // Observable que contendrá los datos del stock en tiempo real desde Firebase
  dataSource$: Observable<Product[]>;

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {
    // Inicializamos el stream de datos
    this.dataSource$ = this.firebaseService.getProducts();
  }

  ngOnInit(): void {}

  /**
   * Abre el diálogo para añadir un nuevo item o editar uno existente.
   * @param item - El item de stock a editar. Si es undefined, se crea uno nuevo.
   */
  openProductDialog(item?: Product): void {
    const dialogRef = this.dialog.open(StockDialogComponent, {
      width: '450px',
      // Pasamos el item al diálogo. Si es un item nuevo, data.item será undefined.
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Si el diálogo se cerró con un resultado positivo (se guardó), mostramos una notificación.
      if (result) {
        this.notification.showSuccess(`Item ${item ? 'actualizado' : 'añadido'} con éxito`);
      }
    });
  }

  /**
   * Elimina un item de stock tras confirmación.
   * @param id - El ID del documento del item a eliminar en Firestore.
   */
  async deleteProductItem(id: string): Promise<void> {
    // Pedimos confirmación al usuario para evitar borrados accidentales
    if (confirm('¿Estás seguro de que quieres eliminar este item del stock?')) {
      try {
        await this.firebaseService.deleteProduct(id);
        this.notification.showSuccess('Item eliminado con éxito');
      } catch (error) {
        this.notification.showError('Error al eliminar el item');
        console.error("Error deleting stock item:", error);
      }
    }
  }
}
