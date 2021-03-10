import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  galleryPhotos = [];
  constructor(private photosService: PhotosService) { }

  ngOnInit(): void {
    this.photosService.getGallery().subscribe((response) => {
      this.galleryPhotos = response;
    }) 
  }
}
