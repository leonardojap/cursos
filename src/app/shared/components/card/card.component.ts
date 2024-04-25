import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() start_date: string = '';
  @Input() end_date: string = '';
  @Input() students: boolean = false;

  constructor() {}

  ngOnInit() {
    if (!this.students) {
      this.type == 'OFFLINE'
        ? (this.type = 'Presencial')
        : (this.type = 'Online');
    }
  }
}
