import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  public profile!: Solicitud;
  constructor(private http: HttpClient,
    public authService:AuthService
  ) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }


  getSolicitudes() {
    const url = `${baseUrl}/solicitudes`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, profiles: Solicitud}) => resp.profiles)
      )
  }

  getSolicitud(_id: Solicitud) {
    const url = `${baseUrl}/solicitud/show/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, profile: Solicitud}) => resp.profile)
        );
  }

  getByUser(usuario:any) {
    const url = `${baseUrl}/solicitud/showbyUser/${usuario}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, profile: any}) => resp)
      )
  }

  

  createSolicitud(data:any){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    const URL = baseUrl+'/solicitud/store';
    return this.http.post(URL,data, {headers:headers});
  }
 
  updateSolicitudStatus( profile_id:any,){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = baseUrl+'/solicitud/update/status/'+profile_id;
    return this.http.put(URL,{headers:headers});
  }

  deleteSolicitud(_id: string) {
    const url = `${baseUrl}/solicitud/destroy/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
