import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private _apiKey: string = 'vwU4Pmo1oV2jvohYBiimfByQTOVqKEGd';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private searchEndPoint: string = 'search';
  public resultados: Gif[] = [];
  get historial(): string[] {
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ) {
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    this.resultados = JSON.parse(localStorage.getItem('lastSearch')!) || [];
  }

  buscarGifs(query: string): void {
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    console.log(this._historial);

    const params = new HttpParams()
        .set('api_key', this._apiKey)
        .set('q', query)
        .set('limit', '30');

    this.http.get<SearchGifsResponse>(`${this.baseUrl}/${this.searchEndPoint}`, {params})
      .subscribe(
        (resp) => {
          console.log(resp.data);
          this.resultados = resp.data;
          localStorage.setItem('lastSearch', JSON.stringify(this.resultados));
        }
      );
  }
}
