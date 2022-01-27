import { Component } from '@angular/core';
import { GifsService } from '../services/gifs-service.service';
import { Gif } from '../interfaces/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  get resultados(): Gif[] {
    return this.gifService.resultados;
  }

  constructor(
    private gifService: GifsService
  ) { }

}
