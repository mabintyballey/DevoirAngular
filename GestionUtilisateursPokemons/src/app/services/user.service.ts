import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // Récupérer les utilisateurs depuis l'API distante
  fetchUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        return users.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          password: this.generateRandomPassword(),
          isAuthenticated: false
        }));
      }),
      // Gestion des erreurs
      catchError(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return [];
      })
    );
  }


  // Générer un mot de passe aléatoire
  private generateRandomPassword(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  // Sauvegarder les utilisateurs dans le localStorage
  saveUsersToLocalStorage(users: any[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Charger les utilisateurs depuis le localStorage
  getUsersFromLocalStorage(): any[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

}
