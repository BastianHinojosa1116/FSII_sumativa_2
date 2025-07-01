import { Component, OnInit } from '@angular/core';
import { InventarioService, InventoryItem } from '../servicios/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  inventory: InventoryItem[] = [];
  inputQuantities: { [idx: number]: number } = {};
  searchTerm: string = '';  // <-- nuevo

  constructor(private invSvc: InventarioService) {}

  ngOnInit(): void {
    this.inventory = this.invSvc.getAll();
  }

  // Getter filtrado
  get filteredItems(): InventoryItem[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      return this.inventory;
    }
    return this.inventory.filter(item =>
      item.nombre.toLowerCase().includes(term)
    );
  }

  sumar(i: number) { /* … */ }
  restar(i: number) { /* … */ }
}