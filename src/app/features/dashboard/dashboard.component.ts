import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../../core/services/firebase.service';
import { User } from '../../core/models/user.model';
import { Sale } from '../../core/models/sale.model';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, NgxChartsModule, MatCardModule,
    MatIconModule, MatListModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, CurrencyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  kpis = { totalSales: 0, salesCount: 0, averageTicket: 0 };
  users$: Observable<User[]> = new Observable();
  salesData$: Observable<any[]> = new Observable();
  transferForm: FormGroup;


  // Opciones de Gráfico
  view: [number, number] = [700, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Fecha';
  showYAxisLabel = true;
  yAxisLabel = 'Total Ventas';
  colorScheme = 'vivid';

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private notification: NotificationService
  ) {
    this.transferForm = this.fb.group({
      fromUser: ['', Validators.required],
      toUser: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.users$ = this.firebaseService.getUsers();

    const sales$ = this.firebaseService.getSales();
    this.updateKpis(sales$);
    this.prepareChartData(sales$);
  }



  updateKpis(sales$: Observable<Sale[]>) {
    sales$.subscribe(sales => {
      this.kpis.salesCount = sales.length;
      this.kpis.totalSales = sales.reduce((sum, sale) => sum + sale.Total, 0);
      this.kpis.averageTicket = this.kpis.salesCount > 0 ? this.kpis.totalSales / this.kpis.salesCount : 0;
    });
  }

  prepareChartData(sales$: Observable<Sale[]>) {
    this.salesData$ = sales$.pipe(
      map(sales => {
        // Filtramos las ventas que no tienen una fecha válida
        const validSales = sales.filter(sale => sale.fecha);
        
        const dailySales: {[key: string]: number} = {};
        
        // Ahora iteramos sobre los datos ya filtrados
        validSales.forEach(sale => {
          const date = sale.fecha.toDate().toLocaleDateString('es-ES');
          dailySales[date] = (dailySales[date] || 0) + sale.Total;
        });

        return Object.keys(dailySales).map(date => ({ name: date, value: dailySales[date] }));
      })
    );
  }

  async onTransfer() {
    if (this.transferForm.invalid) {
      this.notification.showError('Formulario inválido. Revisa los campos.');
      return;
    }
    const { fromUser, toUser, amount } = this.transferForm.value;
    if (fromUser === toUser) {
      this.notification.showError('No se puede transferir dinero a la misma persona.');
      return;
    }
    
    // Aquí es donde llamarías a tu Firebase Function
    try {
      await this.firebaseService.transferFunds(fromUser, toUser, amount);
      this.notification.showSuccess('Transferencia realizada con éxito (simulación).');
      this.transferForm.reset();
      // Refrescar datos de usuarios
      this.users$ = this.firebaseService.getUsers();
    } catch (error) {
      this.notification.showError('Error al realizar la transferencia.');
      console.error(error);
    }
  }
}