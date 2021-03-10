import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { PhotosService } from '../../services/photos.service';
import { Photo, PhotoResponse } from '../../types';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  inputSearchValue: string | undefined;
  outputBlockTitle: string | undefined;
  searchGallery:Photo[] | undefined;
  constructor(private readonly route: ActivatedRoute, private readonly photosService: PhotosService) { }

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.inputSearchValue = value.name;
    })

    this.outputBlockTitle = `Фото на тему "${this.inputSearchValue.charAt(0).toUpperCase()+this.inputSearchValue.slice(1)}"`;

    this.photosService.getRequestPhoto(1, this.inputSearchValue).subscribe((response: PhotoResponse) => {
      this.searchGallery = response.results;
    })
  }

}
