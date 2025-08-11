import { Timestamp } from 'firebase/firestore';

export interface Sale {
  id: string;
  fecha: Timestamp;
  cantidad: number;
  precioVentaUnitario: number;
  Total: number;
  beneficio: number;
  porcentajeBeneficio: number;
  nombreProducto: string;
  proveedorProducto: string;
  nombreVendedor: string;
  nombreCliente: string;
}

