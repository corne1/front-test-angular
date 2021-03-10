import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PhotosService } from '../../../services/photos.service';
import { Photo, PhotoResponse } from '../../../types';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@Component({
  selector: 'app-gallery-template',
  templateUrl: './gallery-template.component.html',
  styleUrls: ['./gallery-template.component.scss']
})
export class GalleryTemplateComponent implements OnInit, OnChanges {
  @Input() photos: Photo[]
  @Input() blockTitle: string;
  @Input() isGallery: boolean;

  nextPage = 3;
  constructor(private dialog: MatDialog, private readonly photosService: PhotosService, private readonly route: ActivatedRoute) { }

  ngOnChanges() {
    const lsArray: string[] = JSON.parse(localStorage.getItem('likePhotoIds'));
    this.photos.map((photo: Photo) => {
      if (lsArray.includes(photo.id)) {
        photo.liked_by_user = true;
      }
    })
  }

  ngOnInit() {

  }

  openDialog(photo: Photo): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = photo

    this.dialog.open(DialogContentComponent,dialogConfig);
  }

  closeDialog(): void {
    this.dialog.closeAll()
  }

  likePhoto(photo: Photo): void {
    let lsArray: string[] = JSON.parse(localStorage.getItem('likePhotoIds'));
    if (!lsArray) {
      lsArray = [];
    }
    if (lsArray.includes(photo.id)) {
      lsArray = lsArray.filter(id => id !== photo.id)
    } else {
      lsArray.push(photo.id)
    }
    localStorage.setItem('likePhotoIds', JSON.stringify(lsArray))
    photo.liked_by_user = !photo.liked_by_user;
  }

  downloadPhoto(photo: Photo): void {
    window.open(photo.links.download);
  }

  onScroll(): void {
    let subs;
    if (this.isGallery) {
      subs = this.photosService.getGallery(this.nextPage).subscribe((response: Photo[]) => {
        response.map((photo) => {
          this.photos.push(photo)
        })
      })
    } else {
      let name = '';
      this.route.params.subscribe((value) => {
        name = value.name;
      });
      subs = this.photosService.getRequestPhoto(this.nextPage, name).subscribe((response: PhotoResponse) => {
        response.results.map((photo) => {
          this.photos.push(photo)
        })
      })
    }
    this.nextPage += 1;
  }
}
