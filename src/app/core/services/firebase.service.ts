import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseConfig } from '../../firebase-config';
import { Observable, from } from 'rxjs';

// Importa los nuevos modelos que crearemos en el siguiente paso
import { Product } from '../models/product.model';
import { Sale } from '../models/sale.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Inicializa los servicios de Firebase
  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private functions = getFunctions(this.app, 'europe-west1'); // Asegúrate de que la región sea la correcta

  constructor() { }



  // --- MÉTODOS DE LECTURA (siguen leyendo directamente de Firestore) ---

  getProducts(): Observable<Product[]> {
    const dataCollection = collection(this.db, 'productos');
    return collectionData(dataCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getSales(): Observable<Sale[]> {
    const dataCollection = collection(this.db, 'ventas');
    return collectionData(dataCollection, { idField: 'id' }) as Observable<Sale[]>;
  }

  getUsers(): Observable<User[]> {
    const dataCollection = collection(this.db, 'usuarios');
    return collectionData(dataCollection, { idField: 'id' }) as Observable<User[]>;
  }



  // --- MÉTODOS DE ESCRITURA (Ahora llaman a las Firebase Functions) ---

  /**
   * Llama a la función 'agregar_producto' para crear o actualizar un producto.
   * @param productData - Datos requeridos por la función de Python.
   */
  addProduct(productData: any): Promise<any> {
    const addProductFn = httpsCallable(this.functions, 'agregar_producto');
    return addProductFn(productData);
  }

  /**
   * Llama a la función 'registrar_venta'.
   * @param saleData - Datos requeridos por la función de Python.
   */
  registerSale(saleData: any): Promise<any> {
    const registerSaleFn = httpsCallable(this.functions, 'registrar_venta');
    return registerSaleFn(saleData);
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
