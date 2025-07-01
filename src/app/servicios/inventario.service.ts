// src/app/servicios/inventario.service.ts
import { Injectable } from '@angular/core';

export interface InventoryItem {
  nombre: string;
  cantidad: number;
  imagen: string;
}

@Injectable({ providedIn: 'root' })
export class InventarioService {
  private storageKey = 'inventoryData';

  // Datos iniciales por defecto
  private defaults: InventoryItem[] = [
    { nombre: 'Laptop', cantidad: 10, imagen: 'assets/images/laptop.png' },
    { nombre: 'Mouse', cantidad: 25, imagen: 'assets/images/mouse.png' },
    { nombre: 'Teclado', cantidad: 15, imagen: 'assets/images/teclado.png' },
    { nombre: 'Lápiz pasta negro', cantidad: 15, imagen: 'assets/images/lapiz_negro.png' },
    { nombre: 'Lápiz pasta azul', cantidad: 15, imagen: 'assets/images/lapiz_azul.png' },
    { nombre: 'Lápiz pasta rojo', cantidad: 15, imagen: 'assets/images/lapiz_rojo.png' }
  ];

  getAll(): InventoryItem[] {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      return JSON.parse(raw) as InventoryItem[];
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.defaults));
    return [...this.defaults];
  }

  save(items: InventoryItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}