import { Component, OnInit } from '@angular/core';
import { InventarioService, InventoryItem } from '../servicios/inventario.service';

/**
 * Representa un ítem de reporte con nombre y total de cantidad.
 */
interface ReportItem {
  /** Nombre del producto o ítem */
  nombre: string;
  /** Cantidad total disponible */
  total: number;
}

/**
 * Componente que genera y muestra reportes de inventario.
 * Permite filtrar los ítems del reporte por nombre.
 */
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  /** Lista de ítems para el reporte, con nombre y cantidad total */
  reportItems: ReportItem[] = [];

  /** Término usado para filtrar los ítems del reporte */
  searchTerm: string = '';

  /**
   * Constructor que inyecta el servicio de inventario.
   * @param invSvc Servicio que provee los datos del inventario
   */
  constructor(private invSvc: InventarioService) {}

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.
   * Carga los datos del inventario y los transforma en ítems de reporte.
   */
  ngOnInit(): void {
    const inventory = this.invSvc.getAll();
    this.reportItems = inventory.map(i => ({
      nombre: i.nombre,
      total: i.cantidad
    }));
  }

  /**
   * Getter que devuelve los ítems de reporte filtrados según el término de búsqueda.
   * Si no hay término, devuelve todos los ítems.
   */
  get filteredReportItems(): ReportItem[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      return this.reportItems;
    }
    return this.reportItems.filter(r =>
      r.nombre.toLowerCase().includes(term)
    );
  }
}
