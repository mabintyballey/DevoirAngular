import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Service disponible globalement
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    // Appel HTTP pour récupérer les données
    return this.http.get<any>(this.apiUrl);
  }
  getPokemon(): void {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=100').subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Erreur:', err),
    });
  }
}

