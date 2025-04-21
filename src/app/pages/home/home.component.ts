import { Component } from '@angular/core';
import { HeaderComponent } from '@root/app/components/header/header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
