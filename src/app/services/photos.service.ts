import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Photo, PhotoResponse } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  constructor(private http: HttpClient) { }

  getGallery(page: number = 2): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${environment.apiPrefix}photos?page=${page}&per_page=50`, { headers: {
      'Authorization': 'Client-ID aSeIHmNX0oosfWh7uutc44Sbsfeu-jobUJ3jMaPezB4'
    }})
  }

  getRequestPhoto(page: number = 1,query: string): Observable<PhotoResponse> {
    return this.http.get<PhotoResponse>(`${environment.apiPrefix}search/photos?page=${page}&query=${query}`, { headers: {
      'Authorization': 'Client-ID aSeIHmNX0oosfWh7uutc44Sbsfeu-jobUJ3jMaPezB4'
    }});
  }
}
