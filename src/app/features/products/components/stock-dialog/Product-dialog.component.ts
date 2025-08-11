import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../../core/models/product.model';
import { FirebaseService } from '../../../../core/services/firebase.service';

@Component({
  selector: 'app-stock-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './stock-dialog.component.html',
  styleUrls: ['./stock-dialog.component.scss']
})

export class StockDialogComponent {
  stockForm: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<StockDialogComponent>,
    // Inyectamos los datos pasados desde el componente padre (el item de stock)
    @Inject(MAT_DIALOG_DATA) public data: { item?: Product },
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    // Determinamos si estamos en modo "edición" o "creación"
    this.isEditMode = !!data.item;

    // Creamos el formulario reactivo con sus validaciones
    this.stockForm = this.fb.group({
      name: [data.item?.nombre || '', Validators.required],
      quantity: [data.item?.stock || 0, [Validators.required, Validators.min(0)]],
      price: [data.item?.precioCompra || 0, [Validators.required, Validators.min(0)]],
    });
  }

  /**
   * Cierra el diálogo sin guardar cambios.
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Guarda los cambios o crea el nuevo item.
   */
  async onSave(): Promise<void> {
    if (this.stockForm.invalid) {
      // Si el formulario no es válido, no hacemos nada.
      return;
    }

    const stockData = this.stockForm.value;
    
    try {
      if (this.isEditMode && this.data.item) {
        // Modo Edición: llamamos al servicio para actualizar
        await this.firebaseService.updateStockItem(this.data.item.id, stockData);
      } else {
        // Modo Creación: llamamos al servicio para añadir
        await this.firebaseService.addStockItem(stockData);
      }
      // Cerramos el diálogo y devolvemos 'true' para indicar que la operación fue exitosa
      this.dialogRef.close(true);
    } catch (error) {
      console.error("Error saving stock item:", error);
      // Aquí podrías usar el NotificationService para mostrar un error dentro del diálogo
    }
  }
}