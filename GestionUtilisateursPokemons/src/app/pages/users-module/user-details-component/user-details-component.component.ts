import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details-component',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-details-component.component.html',
  styleUrl: './user-details-component.component.css'
})
export class UserDetailsComponentComponent {
  @Input() user: any;
}
