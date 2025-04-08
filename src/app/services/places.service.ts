import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number] ;
 
  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
   }

  getUserLocation():Promise<[number,number]>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        // ({coords}) => resolve([coords.longitude, coords.latitude]) //otra forma de llamarlo
        ({coords})=>{
          this.userLocation = [coords.longitude, coords.latitude]
          resolve (this.userLocation);
        },
        (error) => {
          alert('No se pudo obtener la geolocalización')
          console.error('Error obteniendo la ubicación', error);
        }

      )
    })
  }
}
