import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Sale } from '../../../../core/models/sale.model';
import { FirebaseService } from '../../../../core/services/firebase.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-sale-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './sale-dialog.component.html',
  styleUrl: './sale-dialog.component.scss'
})
export class SaleDialogComponent {
  saleForm: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<SaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sale?: Sale },
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.isEditMode = !!data.sale;
    this.saleForm = this.fb.group({
      productName: [data.sale?.nombreProducto || '', Validators.required],
      quantity: [data.sale?.cantidad || 1, [Validators.required, Validators.min(1)]],
      unitPrice: [data.sale?.precioVentaUnitario || 0, [Validators.required, Validators.min(0)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  async onSave(): Promise<void> {
    if (this.saleForm.invalid) {
      return;
    }

    const formValue = this.saleForm.value;
    const saleData = {
      ...formValue,
      total: formValue.quantity * formValue.unitPrice,
      date: this.isEditMode ? this.data.sale?.fecha : Timestamp.now()
    };
    
    try {
      if (this.isEditMode && this.data.sale) {
        await this.firebaseService.updateSale(this.data.sale.id, saleData);
      } else {
        await this.firebaseService.registerSale(saleData);
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.error("Error saving sale:", error);
      // Opcional: mostrar notificación de error
    }
  }
}