import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@root/app/components/grid/grid.component';
import { HeaderComponent } from '@root/app/components/header/header.component';
import { Hotel } from '@root/app/types/hotel.type';
import { SearchBody } from '@root/app/types/searchBody.type';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, GridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private hotels: Hotel[] = []
  public filteredHotels: Hotel[] = []

  ngOnInit(): void {
    this.getData()
  }

  private async getData() {
    try {
      const url = "http://localhost:3000/hotels"
      const res = await fetch(url)
      this.hotels = await res.json()
      this.filteredHotels = this.hotels
    } catch (err) {
      //console.error(err)
      console.log('Hubo un error interno')
    }
  }

  public filterHotels(searchBody: SearchBody) {
    // hago filtro y lo guardo en una propiedad
    this.filteredHotels = this.hotels.filter((hotel) => {
      this.isAMatch(searchBody, hotel)
    })
  }

  private isAMatch(searchBody: SearchBody, hotel: Hotel): boolean {
    if (
      hotel.name.toUpperCase().includes(searchBody.name.toUpperCase()) &&
      searchBody.category.includes(hotel.stars) &&
      hotel.rate >= searchBody.rating &&
      hotel.price <= searchBody.price
    ) {
      return true
    }
    return false
  }

  private isAMatch(searchBody: SearchBody, hotel: Hotel): boolean {
    let result = false;
    if (
      searchBody.name != "" &&
      hotel.name.toUpperCase().includes(searchBody.name.toUpperCase())
    ) {
      result = true
    }
    if (
      searchBody.category.length > 0 &&
      searchBody.category.includes(hotel.stars)
    ) {
      result = true
    }
    if (
      searchBody.rating >= 0 &&
      hotel.rate >= searchBody.rating
    ) {
      result = true
    }
    if (
      searchBody.price > 0 &&
      hotel.price <= searchBody.price
    ) {
      return true
    }
    return result
  }

}
