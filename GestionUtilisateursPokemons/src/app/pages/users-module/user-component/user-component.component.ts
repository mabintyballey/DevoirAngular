import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponentComponent } from "../../nav-bar-component/nav-bar-component.component";
import { RouterModule } from '@angular/router';
import { ConfirmationModalComponentComponent } from "../../confirmation-modal-component/confirmation-modal-component.component";
import { UserDetailsComponentComponent } from "../user-details-component/user-details-component.component";

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    HttpClientModule,
    RouterModule,
    NavBarComponentComponent,
    ConfirmationModalComponentComponent,
    UserDetailsComponentComponent
],
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})

export class UserComponentComponent implements OnInit {
  users: any[] = [];
  showConfirmationModal = false;
  confirmationMessage = '';
  selectedUser: any = null;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.initializeUsers();
    this.loadUsers();
  }

  onConfirmAction(): void {
    if (this.selectedUser) {
      this.toggleAuthentication(this.selectedUser);
    }
    this.showConfirmationModal = false;
    this.selectedUser = null;
  }

  onCancelAction(): void {
    this.showConfirmationModal = false;
  }

  closeModal(): void {
    this.showConfirmationModal = false;
    this.selectedUser = null; // Réinitialise l'utilisateur sélectionné pour la modale
  }

  private loadUsers(): void {
    this.users = this.userService.getUsersFromLocalStorage();
    console.log('Utilisateurs chargés:', this.users);
  }

  private initializeUsers(): void {
    const users = this.userService.getUsersFromLocalStorage();

    // Ajouter l'utilisateur admin localement
    const adminUser = {
      id: 0,
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      isAuthenticated: true
    };

    // Récupérer les utilisateurs depuis l'API
    this.userService.fetchUsers().subscribe(apiUsers => {
      const allUsers = [adminUser, ...apiUsers];

      // Si les utilisateurs locaux existent déjà, ne pas les remplacer mais les fusionner avec ceux de l'API
      const uniqueUsers = this.mergeUsers(users, allUsers);

      // Sauvegarder les utilisateurs dans le localStorage
      this.userService.saveUsersToLocalStorage(uniqueUsers);

      // Charger les utilisateurs pour affichage
      this.loadUsers();
      console.log('Utilisateurs initialisés avec succès.');
    });
  }

  private mergeUsers(existingUsers: any[], newUsers: any[]): any[] {
    const existingIds = existingUsers.map(user => user.id);

    // Ajouter uniquement les utilisateurs qui n'existent pas déjà
    const filteredNewUsers = newUsers.filter(user => !existingIds.includes(user.id));

    return [...existingUsers, ...filteredNewUsers];
  }

  toggleAuthentication(user: any): void {
    const users = this.userService.getUsersFromLocalStorage();
    const foundUser = users.find(u => u.id === user.id);

    if (foundUser) {
      foundUser.isAuthenticated = !foundUser.isAuthenticated;
      this.userService.saveUsersToLocalStorage(users);
      this.loadUsers();
    }
  }

  selectUser(user: any): void {
    if (this.selectedUser === user) {
      this.selectedUser = null;
    } else {
      this.selectedUser = user;
    }
  }

  openConfirmationModal(user: any, event: Event): void {
    this.selectUser(user); // Utilisation de la méthode selectUser pour éviter de déclencher le click sur la ligne de la table
    event.stopPropagation();
    const action = user.isAuthenticated ? 'déconnexion' : 'connexion';
    this.confirmationMessage = `Êtes-vous sûr de vouloir procéder à la ${action} de ${user.name} ?`;

    this.showConfirmationModal = true;
  }
  onRowClick(user: any, event: Event): void {
    event.stopPropagation();
    console.log('Ligne cliquée pour :', user.name);
    this.selectUser(user);
  }

  onActionClick(event: Event): void {
    event.stopPropagation();
  }
   // Méthode pour afficher les détails lors du survol
   onRowHover(user: any): void {
    this.selectedUser = user;
  }
}

