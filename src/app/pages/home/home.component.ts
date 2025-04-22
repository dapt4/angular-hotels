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
  public hotels: Hotel[] = []

  ngOnInit(): void {
    this.getData()
  }

  private async getData() {
    try {
      const url = "http://localhost:3000/hotels"
      const res = await fetch(url)
      this.hotels = await res.json()
    } catch (err) {
      //console.error(err) // depende de la politica de la empresa se permite o no mostrar los errores del lado del cliente
      console.log('Hubo un error interno')
    }
  }

  public handleMessage(event: SearchBody) {
    console.log(event)
    // hago filtro y lo guardo en una propiedad
  }
}
