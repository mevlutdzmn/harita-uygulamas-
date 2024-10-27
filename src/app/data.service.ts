import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0/query?f=json&where=1%3D1&outFields=*';

  constructor(private http: HttpClient) { }

  getFeatures(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
