import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component'; // MapComponent'i ekleyin
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent // Bileşeni burada tanımlayın
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Burada olmalı
})
export class AppModule { }
