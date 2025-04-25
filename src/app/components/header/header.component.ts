import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBody } from '@root/app/types/searchBody.type';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() eventEmiter = new EventEmitter<SearchBody>();
  public searchTerms = new Subject<string>();
  public initBody: SearchBody = {
    name: '',
    category: [],
    rating: null,
    price: null
  }

  public searchBody: SearchBody = { ...this.initBody, category: [...this.initBody.category] };

  public clean(): void {
    this.searchBody = { ...this.initBody, category: [...this.initBody.category] };
    this.sendFilters()
  }

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((term: string) => {
      this.searchBody.name = term
      this.sendFilters();
    });
  }

  public toggleStars(event: Event, star: number): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.searchBody.category.push(star)
    } else {
      const index = this.searchBody.category.indexOf(star)
      this.searchBody.category.splice(index, 1)
    }
    this.sendFilters()
  }

  public onSearch(): void {
    this.searchTerms.next(this.searchBody.name);
  }

  public sendFilters(): void {
    this.eventEmiter.emit(this.searchBody);
  }

}

