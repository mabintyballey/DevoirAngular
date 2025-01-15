import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const authenticatedUser = users.find((u: any) => u.isAuthenticated);

    if (authenticatedUser) {
      return true; // Autorise l'accès
    }

    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    this.router.navigate(['/login']);
    return false;
  }
}
