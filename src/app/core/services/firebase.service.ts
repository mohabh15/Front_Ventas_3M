import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, collection, collectionData } from '@angular/fire/firestore'; // Importa Firestore
import { Functions, httpsCallable } from '@angular/fire/functions'; // Importa Functions
import { firebaseConfig } from '../../firebase-config';
import { Observable } from 'rxjs';

// Importa los modelos
import { Product } from '../models/product.model';
import { Sale } from '../models/sale.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Ahora, en lugar de inicializar los servicios aquí, Angular los inyectará.
  // Solo necesitas la configuración para la inicialización global en el app.config.ts

  constructor(
    private readonly firestore: Firestore, // <-- Angular inyecta el servicio de Firestore
    private readonly functions: Functions  // <-- Angular inyecta el servicio de Functions
  ) { }



  // --- MÉTODOS DE LECTURA (ahora usan el servicio inyectado) ---

  getProducts(): Observable<Product[]> {
    const dataCollection = collection(this.firestore, 'productos');
    return collectionData(dataCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getSales(): Observable<Sale[]> {
    const dataCollection = collection(this.firestore, 'ventas');
    return collectionData(dataCollection, { idField: 'id' }) as Observable<Sale[]>;
  }

  getUsers(): Observable<User[]> {
    const dataCollection = collection(this.firestore, 'usuarios');
    return collectionData(dataCollection, { idField: 'id' }) as Observable<User[]>;
  }








  // --- MÉTODOS DE ESCRITURA (ya estaban correctos, pero ahora usan el servicio inyectado) ---

  addProduct(productData: {
    nombre_producto: string,
    numero_unidades: number,
    proveedor: string,
    responsable: string,
    precio_compra: number
  }): Promise<any> {
    const addProductFn = httpsCallable(this.functions, 'agregar_producto');
    return addProductFn(productData);
  }

  registerSale(saleData: {
    nombre_producto: string,
    proveedor: string,
    nombre_vendedor: string,
    nombre_cliente: string,
    cantidad: number,
    precio_venta_unitario: number
  }): Promise<any> {
    const registerSaleFn = httpsCallable(this.functions, 'registrar_venta');
    return registerSaleFn(saleData);
  }

  createCollections(): Promise<any> {
    const createCollectionsFn = httpsCallable(this.functions, 'crear_colecciones');
    return createCollectionsFn({});
  }













  // --- MÉTODOS PREPARADOS PARA EL FUTURO (DATOS DUMMY) ---

  /**
   * edit sale 
   * [TODO] Actualiza una venta. Deberás crear la función 'actualizar_venta' en tu backend.
   * @param saleId - El ID de la venta a actualizar.
   * @param saleData - Los nuevos datos de la venta.
   * @return Una promesa que se resuelve cuando la venta ha sido actualizada.
   */
    updateSale(saleId: string, saleData: any): Promise<any> {
        console.warn(`[DUMMY] Llamando a actualizar_venta con ID: ${saleId}`);
        // Cuando crees la función, reemplaza esto con:
        // const updateSaleFn = httpsCallable(this.functions, 'actualizar_venta');
        // return updateSaleFn({ saleId, saleData });
        return Promise.resolve({ success: true, message: 'Venta actualizada (simulación).' });
    }


  /**
   * [DUMMY] Elimina un producto. Deberás crear la función 'eliminar_producto' en tu backend.
   * @param productId - El ID del producto a eliminar.
   */
  deleteProduct(productId: string): Promise<any> {
    console.warn(`[DUMMY] Llamando a eliminar_producto con ID: ${productId}`);
    // Cuando crees la función, reemplaza esto con:
    // const deleteProductFn = httpsCallable(this.functions, 'eliminar_producto');
    // return deleteProductFn({ productId });
    return Promise.resolve({ success: true, message: 'Producto eliminado (simulación).' });
  }

  /**
   * [DUMMY] Elimina una venta. Deberás crear la función 'eliminar_venta' en tu backend.
   * @param saleId - El ID de la venta a eliminar.
   */
  deleteSale(saleId: string): Promise<any> {
    console.warn(`[DUMMY] Llamando a eliminar_venta con ID: ${saleId}`);
    // Cuando crees la función, reemplaza esto con la llamada real.
    return Promise.resolve({ success: true, message: 'Venta eliminada (simulación).' });
  }


    /**
     * [DUMMY] Actualiza un item de stock. Deberás crear la función 'actualizar_item_stock' en tu backend.
     * @param itemId - El ID del item de stock a actualizar.
     * @param itemData - Los nuevos datos del item de stock.
     */
    updateStockItem(itemId: string, itemData: any): Promise<any> {
        console.warn(`[DUMMY] Llamando a actualizar_item_stock con ID: ${itemId}`);
        // Cuando crees la función, reemplaza esto con:
        // const updateStockItemFn = httpsCallable(this.functions, 'actualizar_item_stock');
        // return updateStockItemFn({ itemId, itemData });
        return Promise.resolve({ success: true, message: 'Item de stock actualizado (simulación).' });
    }

    /**
     * [DUMMY] Añade un nuevo item de stock. Deberás crear la función 'agregar_item_stock' en tu backend.
     * @param itemData - Los datos del nuevo item de stock.
     * @return Una promesa que se resuelve cuando el item ha sido añadido.
     * */
    addStockItem(itemData: any): Promise<any> {
        console.warn(`[DUMMY] Llamando a agregar_item_stock con datos:`, itemData);
        // Cuando crees la función, reemplaza esto con:
        // const addStockItemFn = httpsCallable(this.functions, 'agregar_item_stock');
        // return addStockItemFn(itemData);
        return Promise.resolve({ success: true, message: 'Item de stock añadido (simulación).' });
    }

  /**
   * [DUMMY] Transfiere fondos entre usuarios. Deberás crear la función
   * 'transferir_fondos' en tu backend.
   * @param fromUserId - ID del usuario que envía los fondos.
   * @param toUserId - ID del usuario que recibe los fondos.
   * @param amount - Monto a transferir.
   * @return Una promesa que se resuelve cuando la transferencia ha sido realizada.
   * */
  transferFunds(fromUserId: string, toUserId: string, amount: number): Promise<any> {
    console.warn(`[DUMMY] Llamando a transferir_fondos con de ${fromUserId} a ${toUserId} por ${amount}€`);
    // Cuando crees la función, reemplaza esto con:
    // const transferFundsFn = httpsCallable(this.functions, 'transferir_fondos');
    // return transferFundsFn({ fromUserId, toUserId, amount });
    return Promise.resolve({ success: true, message: 'Transferencia realizada (simulación).'  });
  }



}
