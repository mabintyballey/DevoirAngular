import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { PokemonService } from '../../../services/pokemon.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { NavBarComponentComponent } from '../../nav-bar-component/nav-bar-component.component';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css'],
  imports: [NgFor, RouterModule, NavBarComponentComponent],
})
export class DashboardComponentComponent implements OnInit {
  // Liste complète des Pokémon
  pokemons: any[] = [];
  // Pokémon à afficher sur la page actuelle
  paginatedPokemons: any[] = [];
  // Page courante
  currentPage: number = 1;
  // Nombre d'éléments par page
  itemsPerPage: number = 10;
  // Nombre total de pages
  totalPages: number = 0;
   // Tableau des numéros de page
  pages: number[] = [];

  constructor(
    private authService: AuthService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charger les Pokémon au démarrage
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons().subscribe(
      (response) => {
        this.pokemons = response.results;
        this.setupPagination();
      },
      (error) => {
        console.error('Erreur lors du chargement des Pokémon :', error);
      }
    );
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.pokemons.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePageContent();
  }

  updatePageContent(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPokemons = this.pokemons.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageContent();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
