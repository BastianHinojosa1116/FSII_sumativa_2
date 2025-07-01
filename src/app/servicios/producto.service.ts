import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private productos = [
    // Azar
    {
      id: 'poker',
      name: 'Poker',
      category: 'Azar',
      image: 'assets/images/poker.png',
      description: 'Un clásico juego de cartas donde la estrategia y la suerte se combinan.',
      price: '$15.990',
      discount: 'Sí, 20% OFF'
    },
    {
      id: 'ruleta',
      name: 'Ruleta',
      category: 'Azar',
      image: 'assets/images/ruleta.png',
      description: 'Prueba tu suerte en este emocionante juego de apuestas y estrategia.',
      price: '$12.990',
      discount: 'No'
    },

    // Dados
    {
      id: 'monopoly',
      name: 'Monopoly',
      category: 'Dados',
      image: 'assets/images/monopoly.png',
      description: 'Un clásico juego de tablero para compartir en familia',
      price: '$19.990',
      discount: 'Sí, 20% OFF'
    },
    {
      id: 'optimus',
      name: 'Optimus',
      category: 'Dados',
      image: 'assets/images/optimus.png',
      description: 'Vence a los demás en este emocionante juego de competencia.',
      price: '$9.990',
      discount: 'No'
    },

    // Estrategia
    {
      id: 'carcassonne',
      name: 'Carcassonne',
      category: 'Estrategia',
      image: 'assets/images/carcassonne.png',
      description: 'Construye ciudades, caminos y monasterios mientras expandes tu territorio.',
      price: '$15.990',
      discount: 'Sí, 20% OFF'
    },
    {
      id: 'catan',
      name: 'Catan',
      category: 'Estrategia',
      image: 'assets/images/catan.png',
      description: 'Un juego de negociación y construcción donde los recursos determinan tu éxito.',
      price: '$12.990',
      discount: 'No'
    },

    // Rol
    {
      id: 'dnd',
      name: 'Dungeons & Dragons',
      category: 'Rol',
      image: 'assets/images/dungeons&dragon.png',
      description: 'Sumérgete en un mundo de fantasía donde la destreza y la imaginación son clave',
      price: '$15.990',
      discount: 'Sí, 20% OFF'
    },
    {
      id: 'pathfinder',
      name: 'Pathfinder',
      category: 'Rol',
      image: 'assets/images/Pathfinder.png',
      description: 'Un juego de rol lleno de aventuras épicas, donde tus decisiones marcan el destino.',
      price: '$12.990',
      discount: 'No'
    }
  ];

  obtenerProductoPorId(id: string) {
    return this.productos.find(p => p.id === id);
  }

  obtenerTodos(): any[] {
    return this.productos;
  }

  obtenerPorCategoria(categoria: string): any[] {
    return this.productos.filter(p => p.category.toLowerCase() === categoria.toLowerCase());
  }
}
