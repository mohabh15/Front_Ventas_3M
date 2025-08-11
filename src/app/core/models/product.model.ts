import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  nombre: string;
  stock: number;
  proveedor: string;
  responsable: string;  // Nombre del usuario
  precioCompra: number;
  fechaCreacion: Timestamp;
}
