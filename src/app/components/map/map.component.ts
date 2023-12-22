import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Control, LayerGroup, Map, marker, tileLayer } from 'leaflet';
import { Geocoder } from 'leaflet-control-geocoder';
import * as leafletControlGeocoder from 'leaflet-control-geocoder';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input('location') location = "4.5981206,-74.0786184";
  
  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    const map = new Map('map').setView([this.locationMap(0), this.locationMap(1)], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const markerItem = marker([this.locationMap(0), this.locationMap(1)]).addTo(map);
          markerItem.bindPopup('¡Arraigo aproximado!').openPopup();
    
  }

  locationMap(type: number){
    let separateNumbers = this.location.split(',');
    if(type == 0){
      return parseFloat(separateNumbers[0]);
    }else {
      return parseFloat(separateNumbers[1]);
    }
  }

}
