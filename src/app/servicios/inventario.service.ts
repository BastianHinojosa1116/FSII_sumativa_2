import { Injectable } from '@angular/core';

/**
 * Representa un ítem de inventario.
 * @typedef {Object} InventoryItem
 * @property {string} nombre - Nombre del producto
 * @property {number} cantidad - Cantidad disponible en inventario
 * @property {string} imagen - Ruta a la imagen del producto
 */
export interface InventoryItem {
  nombre: string;
  cantidad: number;
  imagen: string;
}

/**
 * Servicio para gestionar el inventario de productos,
 * almacenando los datos en localStorage.
 */
@Injectable({ providedIn: 'root' })
export class InventarioService {
  private storageKey = 'inventoryData';

  /**
   * Inventario por defecto que se usará si no hay datos en localStorage.
   * @type {InventoryItem[]}
   */
  private defaults: InventoryItem[] = [
    { nombre: 'Laptop', cantidad: 10, imagen: 'assets/images/laptop.png' },
    { nombre: 'Mouse', cantidad: 25, imagen: 'assets/images/mouse.png' },
    { nombre: 'Teclado', cantidad: 15, imagen: 'assets/images/teclado.png' },
    { nombre: 'Lápiz pasta negro', cantidad: 15, imagen: 'assets/images/lapiz_negro.png' },
    { nombre: 'Lápiz pasta azul', cantidad: 15, imagen: 'assets/images/lapiz_azul.png' },
    { nombre: 'Lápiz pasta rojo', cantidad: 15, imagen: 'assets/images/lapiz_rojo.png' }
  ];

  /**
   * Obtiene todo el inventario desde localStorage.
   * Si no existe previamente, inicializa con los valores por defecto.
   *
   * @returns {InventoryItem[]} Lista de productos en inventario
   */
  getAll(): InventoryItem[] {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      return JSON.parse(raw) as InventoryItem[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaults));
    return [...this.defaults];
  }

  /**
   * Guarda el inventario en localStorage.
   * @param {InventoryItem[]} items - Lista de productos a guardar
   */
  save(items: InventoryItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
