import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from '@root/app/types/hotel.type';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit {
  @Input() hotels: Hotel[] = [];

  public page = 1;
  public totalPages = 1;
  public itemsPerPage = 10;
  public displayedHotels: Hotel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.calculateTotalPages();
    this.updateDisplayedHotels();
  }

  ngOnChanges(): void {
    this.calculateTotalPages();
    this.updateDisplayedHotels();
  }

  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.hotels.length / this.itemsPerPage);
    if (this.totalPages === 0) this.totalPages = 1;
  }

  private updateDisplayedHotels(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedHotels = this.hotels.slice(startIndex, endIndex);
  }

  public increase() {
    if (this.page < this.totalPages){
    this.page += 1
    this.updateDisplayedHotels()
    }
  }

  public decrease() {
    if (this.page > 1) {
      this.page -= 1;
      this.updateDisplayedHotels()
    }
  }

}
