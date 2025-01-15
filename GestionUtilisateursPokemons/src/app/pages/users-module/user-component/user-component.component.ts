import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponentComponent } from "../../../nav-bar-component/nav-bar-component.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    HttpClientModule,
    RouterModule,
    NavBarComponentComponent
],

  templateUrl: './user-component.component.html',
  styleUrl: './user-component.component.css'
})

export class UserComponentComponent implements OnInit {
  users: any[] = [];
  showConfirmationModal = false;
  confirmationMessage = '';
  selectedUser: any = null;

  constructor(private userService: UserService,private http: HttpClient) {}

  ngOnInit() {
    this.initializeUsers();
    this.loadUsers();
  }
// Gestion de la modale
openConfirmationModal(user: any): void {
  console.log('Méthode openConfirmationModal appelée pour :', user);
  this.selectedUser = user;
  const action = user.isAuthenticated ? 'déconnexion' : 'connexion';
  this.confirmationMessage = `Êtes-vous sûr de vouloir procéder à la ${action} de ${user.name} ?`;
  this.showConfirmationModal = true;
}


onConfirmAction(): void {
  if (this.selectedUser) {
    this.toggleAuthentication(this.selectedUser);
  }
  this.showConfirmationModal = false;
}

onCancelAction(): void {
  this.showConfirmationModal = false;
}

// Recharge la liste des utilisateurs
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

  // Méthode pour fusionner les utilisateurs existants avec ceux récupérés
  private mergeUsers(existingUsers: any[], newUsers: any[]): any[] {
    const existingIds = existingUsers.map(user => user.id);

    // Ajouter uniquement les utilisateurs qui n'existent pas déjà
    const filteredNewUsers = newUsers.filter(user => !existingIds.includes(user.id));

    return [...existingUsers, ...filteredNewUsers];
  }
// methode pour authentication des users
  toggleAuthentication(user: any): void {
    const users = this.userService.getUsersFromLocalStorage();
    const foundUser = users.find(u => u.id === user.id);

    if (foundUser) {
      foundUser.isAuthenticated = !foundUser.isAuthenticated;
      this.userService.saveUsersToLocalStorage(users);
      this.loadUsers();
    }
  }

// // method pour envoyer email
sendEmail(): void {
  const email = 'sow1998dara@gmail.com';
  const subject = encodeURIComponent('Voici le lien GitHub de mon projet');
  const body = encodeURIComponent(`
Bonjour,

Voici le lien GitHub de mon projet :

Frontend : https://github.com/mabintyballey/DevoirAngular.git

Cordialement,
Mabinty Balley Bangoura
`);
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;
}




}
