export interface User {
  id: string;
  nombre: string;
  balance ?: number;
  rol ?: 'proveedor' | 'cliente' | 'vendedor';
}
