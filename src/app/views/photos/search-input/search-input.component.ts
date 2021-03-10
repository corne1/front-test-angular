import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  searchInputSubmit(value: string) {
    this.router.navigate([`/photos/search/${value.toLowerCase()}`])
  }
}
