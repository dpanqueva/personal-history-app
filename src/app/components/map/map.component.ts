import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Control, LayerGroup, Map, marker, tileLayer } from 'leaflet';
import { Geocoder } from 'leaflet-control-geocoder';
import * as leafletControlGeocoder from 'leaflet-control-geocoder';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    const map = new Map('map').setView([4.60971, -74.08175], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const markerItem = marker([4.5964766, -74.09868299999999]).addTo(map);
          markerItem.bindPopup('¡Hola, soy un marcador!').openPopup();
    /*const markerItem = marker([4.60971, -74.08175]).addTo(map);
     map.fitBounds([
       [markerItem.getLatLng().lat, markerItem.getLatLng().lng]
     ]);*/
    //
    //const address = 'CLL 60 A SUR # 73-31, Bogotá, Colombia';
    //
    //const formattedAddress = encodeURIComponent(address);
    //const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${formattedAddress}`;

    /*console.log(apiUrl);
    this.http.get<any>(apiUrl).subscribe(
      (result) => {
        if (result && result.length > 0) {
          const firstResult = result[0];
          const latitude = parseFloat(firstResult.lat);
          const longitude = parseFloat(firstResult.lon);
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          const markerItem = marker([latitude, longitude]).addTo(map);
          markerItem.bindPopup('¡Hola, soy un marcador!').openPopup();
        } else {
          console.error('No se encontraron resultados para la dirección:', address);
        }
      },
      (error) => {
        console.error('Error al obtener las coordenadas:', error);
      }
    );*/


    //this.api('CLL 60 A SUR # 73-31, Bogotá, Colombia');
    //this.apiGoogle();
    //
  }
  private buildLatLon(map: any, address: string): void {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    console.log(geocodeUrl);
    debugger
    this.http.get(geocodeUrl).subscribe((data: any) => {
      if (data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        //this.addMarker(lat, lon, address);
        marker([lat, lon]).addTo(map)
      } else {
        console.error('No se encontraron resultados para la dirección:', address);
      }
    });
  }

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private async apiGoogle() {
    const apikey = "AIzaSyBbCaPJDJSPN8Zon_cciGrw_RhkgCGYHr4";
    this.httpHeaders.append('Authorization', 'Bearer ' + apikey);
    // Obtenemos la dirección del usuario
    const address = "CLL 60 A SUR # 73-31, Bogotá, Colombia";

    // Realizamos la solicitud
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&region=CO`;
    console.log(url);
    //const response = await this.http.get(url);

    // Obtenemos las coordenadas
    //const results = await response.toPromise();

    const results = this.http
      .get<any>(url, {
        headers: this.httpHeaders,
      }).subscribe({
        next: (e) => {
          //this.messageService.successFullMessage(environment.contacto_registrado_ok);
          console.log(e);

        },
        error: (e) => {
          console.error(e);
          //this.errorBadRequest(e);
        },
      });

    console.log(results);
    // Mostramos las coordenadas
    //const latitud = location.lat;
    //const longitud = location.lng;
    //alert(`Latitud: ${latitud}, Longitud: ${longitud}`);
  }

  private api(address: any) {
    const formattedAddress = encodeURIComponent(address);
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${formattedAddress}`;

    console.log(apiUrl);
    this.http.get<any>(apiUrl).subscribe(
      (result) => {
        if (result && result.length > 0) {
          const firstResult = result[0];
          const latitude = parseFloat(firstResult.lat);
          const longitude = parseFloat(firstResult.lon);
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        } else {
          console.error('No se encontraron resultados para la dirección:', address);
        }
      },
      (error) => {
        console.error('Error al obtener las coordenadas:', error);
      }
    );
  }

}