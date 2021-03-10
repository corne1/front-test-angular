import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotosService } from '../../../services/photos.service';
import { Category, PhotoResponse } from '../../../types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [
    {
      label: 'Цветы',
    },
    {
      label: 'Фон',
    },
    {
      label: '8 Марта',
    },
    {
      label: 'Белый Фон',
    },    
    {
      label: 'Весна',
    },    
    {
      label: 'Тюльпаны',
    },    
    {
      label: 'Бизнес',
    },    
  ];
  constructor(private readonly photosService: PhotosService, private readonly router: Router) { }

  ngOnInit(): void {
    this.categories.map((category) => {
      this.photosService.getRequestPhoto(1, category.label).subscribe((response: PhotoResponse) => {
        category.backgroundImage = response.results[0].urls.thumb;
      })
    })
  }

  loadPhotoByCategory(value: string): void {
    this.router.navigate([`/photos/search/${value.toLowerCase()}`])
  }
}
