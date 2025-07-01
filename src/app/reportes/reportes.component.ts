import { Component, OnInit } from '@angular/core';
import { InventarioService, InventoryItem } from '../servicios/inventario.service';

interface ReportItem {
  nombre: string;
  total: number;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reportItems: ReportItem[] = [];
  searchTerm: string = '';   // 1) Término de búsqueda

  constructor(private invSvc: InventarioService) {}



  ngOnInit(): void {
    const inventory = this.invSvc.getAll();
    this.reportItems = inventory.map(i => ({
      nombre: i.nombre,
      total: i.cantidad
    }));
  }

  // 2) Getter que devuelve solo los que coinciden
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
