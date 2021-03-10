import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { CategoriesComponent } from './photos/categories/categories.component';
import { SearchInputComponent } from './photos/search-input/search-input.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchPageComponent } from './search-page/search-page.component';
import { GalleryTemplateComponent } from './templates/gallery-template/gallery-template.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { DialogContentComponent } from './templates/gallery-template/dialog-content/dialog-content.component';
import { UpperFirstWordPipe } from '../pipes/upper-first-word.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
  {
    path: 'photos',
    children: [
      {
        path: '',
        component: PhotosComponent,
      },
      {
        path: 'search',
        children: [
          {
            path: ':name',
            component: SearchPageComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/photos'
  }
]

@NgModule({
  declarations: [
    PhotosComponent, 
    CategoriesComponent, 
    SearchInputComponent, 
    SearchPageComponent, 
    GalleryTemplateComponent, 
    DialogContentComponent,
    UpperFirstWordPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,  {
      onSameUrlNavigation: 'reload',
			preloadingStrategy: PreloadAllModules,
    }),
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    InfiniteScrollModule
  ],
  exports: [
    RouterModule
  ]
})
export class ViewsModule { }
