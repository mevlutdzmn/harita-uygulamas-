import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

// ESRI modüllerini tanımlama
declare var require: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  features: any[] = []; // Tablodaki veriler için
  selectedFeature: any; // Seçilen özelliği tutmak için

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initializeMap();
    this.loadFeatures();
  }

  initializeMap(): void {
    require([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/FeatureLayer'
    ], (Map: any, MapView: any, FeatureLayer: any) => {
      const map = new Map({
        basemap: 'hybrid'
      });

      const view = new MapView({
        container: 'viewDiv',
        map: map,
        extent: {
          xmin: -9177811,
          ymin: 4247000,
          xmax: -9176791,
          ymax: 4247784,
          spatialReference: 102100
        }
      });

      const featureLayer = new FeatureLayer({
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
      });

      map.add(featureLayer);

      view.when(() => {
        view.on('click', (event: any) => {
          view.hitTest(event).then((response: any) => {
            const graphic = response.results[0]?.graphic;
            if (graphic) {
              this.selectedFeature = graphic.attributes; // Seçilen özelliği sakla
              view.popup.open({
                title: 'Tree Info',
                content: 'Tree ID: ' + graphic.attributes.OBJECTID,
                location: event.mapPoint
              });
            }
          });
        });
      });
    });
  }

  loadFeatures(): void {
    this.dataService.getFeatures().subscribe((data) => {
      console.log(data); // Gelen veriyi incelemek için
      this.features = data.features.map((feature: any) => feature.attributes);
    });
  }
  
}
