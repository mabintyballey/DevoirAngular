import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logout(): void {
    // Supprimez les données de session ou les tokens
    localStorage.removeItem('authToken');
  }
}
