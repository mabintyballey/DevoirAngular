import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal-component',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal-component.component.html',
  styleUrls: ['./confirmation-modal-component.component.css']
})
export class ConfirmationModalComponentComponent {
  @Input() showConfirmationModal: boolean = true
  @Input() message = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
