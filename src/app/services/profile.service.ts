import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public profile!: Profile;
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


  getProfiles() {
    const url = `${baseUrl}/profiles`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, profiles: Profile}) => resp.profiles)
      )
  }

  getProfile(_id: Profile) {
    const url = `${baseUrl}/profile/show/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, profile: Profile}) => resp.profile)
        );
  }

  getByUser(usuario:any) {
    const url = `${baseUrl}/profile/showbyUser/${usuario}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, profile: any}) => resp)
      )
  }

  listarUsuario(id:string):Observable<any>{
    const url = `${baseUrl}/profile/user_profile/${id}`;
    return this.http.get<any>(url,this.headers)
    .pipe(
      map((resp:{ok: boolean, profile: Profile}) => resp.profile)
    )

  }


  // createProfile(profile:Profile) {
  //   const url = `${baseUrl}/profile/store`;
  //   return this.http.post(url, profile, this.headers);
  // }

  // updateProfile(profile:Profile) {
  //   const url = `${baseUrl}/profile/update/${profile.id}`;
  //   return this.http.put(url, profile, this.headers);
  // }

  createProfile(data:any){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    const URL = baseUrl+'/profile/store';
    return this.http.post(URL,data, {headers:headers});
  }
  updateProfile( data:any, profile_id:any,){
    const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    const URL = baseUrl+'/profile/update/'+profile_id;
    return this.http.put(URL,data,{headers:headers});
  }
  updateProfileStatus( data:any, profile_id:number){
    // const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    // const URL = baseUrl+'/profile/update/status/'+profile_id;
    // return this.http.put(URL,data, {headers:headers});

    const url = `${baseUrl}/profile/update/status/${profile_id}`;
    return this.http.put(url,  data, this.headers);
  }

  deleteProfile(_id: string) {
    const url = `${baseUrl}/profiles/destroy/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
