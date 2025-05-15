import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,     
  IonLabel,     
  IonInput,
  IonButton      // <-- Importa esto
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { GpsService } from '../services/gps.service'; // Importa el servicio
import { FormsModule } from '@angular/forms'; // <-- Importa esto

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,   // <-- Agrega esto
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton      // <-- Agrega esto
  ],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;
  nombre: string = ''; // Variable para el nombre

  constructor(private gpsService: GpsService) { // Inyecta el servicio
    this.getCurrentLocation(); //Obtener la ubicacion automaticamente al cargar la pagina
  }

  // Método para guardar la ubicación
  guardarUbicacion() {
    if (this.latitude !== null && this.longitude !== null && this.nombre) {
      const url = `https://www.google.com/maps/@${this.latitude},${this.longitude},16z`;
      this.gpsService.guardarUbicacion(url, this.nombre)
        .then(() => alert('Ubicación guardada'))
        .catch(err => alert('Error al guardar: ' + err));
    }
  }

  async ngOnInit() {
    // Solicita permisos de ubicación
    await Geolocation.requestPermissions();
    this.getCurrentLocation();
  }


  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
}
