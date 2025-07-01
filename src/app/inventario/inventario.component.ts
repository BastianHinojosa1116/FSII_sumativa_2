import { Component, OnInit } from '@angular/core';
import { InventarioService, InventoryItem } from '../servicios/inventario.service';

/**
 * Componente que muestra y administra el inventario de productos.
 * Permite filtrar productos y ajustar cantidades.
 */
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  /** Lista completa del inventario cargada desde el servicio */
  inventory: InventoryItem[] = [];

  /**
   * Objeto que almacena las cantidades ingresadas por el usuario,
   * indexadas por el índice del producto en el inventario.
   */
  inputQuantities: { [idx: number]: number } = {};

  /** Término para filtrar productos por nombre */
  searchTerm: string = '';

  /**
   * Constructor que inyecta el servicio de inventario.
   * @param invSvc Servicio que maneja la lógica del inventario
   */
  constructor(private invSvc: InventarioService) {}

  /**
   * Ciclo de vida Angular que se ejecuta al iniciar el componente.
   * Carga el inventario desde el servicio.
   */
  ngOnInit(): void {
    this.inventory = this.invSvc.getAll();
  }

  /**
   * Obtiene la lista filtrada de productos según el término de búsqueda.
   * Si no hay término, devuelve todo el inventario.
   */
  get filteredItems(): InventoryItem[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      return this.inventory;
    }
    return this.inventory.filter(item =>
      item.nombre.toLowerCase().includes(term)
    );
  }

  /**
   * Incrementa la cantidad ingresada para un producto específico.
   * @param i Índice del producto en la lista
   */
  sumar(i: number) {
    // Implementación aquí
  }

  /**
   * Decrementa la cantidad ingresada para un producto específico.
   * @param i Índice del producto en la lista
   */
  restar(i: number) {
    // Implementación aquí
  }
}
