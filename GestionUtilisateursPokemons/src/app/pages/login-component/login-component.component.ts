import { NgIf } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      // Authentifie l'utilisateur
      user.isAuthenticated = true;
      localStorage.setItem('users', JSON.stringify(users));

      // Redirige vers le tableau de bord
      this.router.navigate(['/dashboard']);
    } else {
      // Affiche un message d'erreur si les informations sont incorrectes
      this.errorMessage = "Identifiant incorrect.";
    }
  }
}
