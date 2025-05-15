import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';

export interface Ubicacion {
  url: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  constructor(private firestore: Firestore) {}

  guardarUbicacion(url: string, nombre: string) {
    const ubicacionesRef = collection(this.firestore, 'ubicaciones');
    const ubicacion: Ubicacion = { url, nombre };
    return addDoc(ubicacionesRef, ubicacion);
  }
}
