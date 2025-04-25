import { CommonModule } from '@angular/common';
import {  Component, Input, OnInit, inject } from '@angular/core';
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
  private generator!: Iterator<number>;
  public page = 1;
  public totalPages!: number;

constructor(){}

  ngOnInit(): void {
    this.startPage()
  }

  public startPage(): void {
    this.generator = this.genPage()
  }

  public getPage() {
    let val = this.generator.next().value
    console.log(val)
    return val
  }

  public increase() {
    if(this.page +1 > this.totalPages) return this.startPage()
    this.page += 1
    this.startPage()
  }

  public decrease() {
    if (this.page - 1 === 0) {
      this.startPage()
      return;
    }
    this.page -= 1;
    this.startPage()
  }

  private *genPage() {
    let page = 1;
    let index = 0;
    let topValue = 9;
    while (true) {
      if (index > topValue) {
        topValue += 10
        page += 1
        this.totalPages = page
      }
      index += 1
      yield page;
    }
  }
}
