import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  appTitle: string = 'Gifs - App';
  get historial(): string[] {
    return this.gifsService.historial;
  }

  constructor(
    private gifsService: GifsService
  ) { }

  buscar(query: string): void {
    this.gifsService.buscarGifs(query);
  }
}
