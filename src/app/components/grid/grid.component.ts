import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Hotel } from '@root/app/types/hotel.type';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  @Input() hotels: Hotel[] = []
}
