import { Component, OnInit, ɵɵpureFunction0 } from '@angular/core';
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
    this.filteredHotels = this.hotels.filter((hotel) =>
      this.isAMatch(searchBody, hotel)
    )
  }

  private isAMatch(searchBody: SearchBody, hotel: Hotel): boolean {
    if (searchBody.name !== "") {
      if (!hotel.name.toUpperCase().includes(searchBody.name.toUpperCase())) {
        return false;
      }
    }

    if (searchBody.category.length > 0) {
      if (!searchBody.category.includes(hotel.stars)) {
        return false;
      }
    }

    if (searchBody.rating != null) {
      if (hotel.rate < searchBody.rating) {
        return false;
      }
    }

    if (searchBody.price != null) {
      if (hotel.price > searchBody.price) {
        return false;
      }
    }

    return true;
  }

}
