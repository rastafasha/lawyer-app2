import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { CargarUsuario } from '../auth/interfaces/cargar-usuarios.interface';

import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { environment } from '../environments/environment';


const base_url = environment.url_backend;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario?: Usuario;
  public identity: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
    ) {
      // this.googleInit();
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN' | 'USER' | 'VENTAS' {
    return this.usuario.role;
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    // localStorage.setItem('menu', JSON.stringify(menu));
  }

  getLocalStorage(){
    localStorage.getItem('token')
        
  }


  googleInit(){

    return new Promise<void>((resolve) =>{

      gapi.load('auth2', () =>{
        this.auth2 = gapi.auth2.init({
          client_id: environment.client_idGoogle,
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });


  }


  logout(){
    localStorage.removeItem('token');
    // localStorage.removeItem('menu');
    this.router.navigateByUrl('/home');

    if(this.router === undefined){
      this.router.navigateByUrl('/home');
    }


    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/home');
      })
    })
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { first_name, last_name, pais, telefono, numdoc, email,  google, role, img='', uid} = resp.usuario;

        this.usuario = new Usuario(first_name, last_name, pais, telefono, numdoc, email, '', img, google, role, uid);

        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios/registro`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    )
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }


  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    )
  }

  loginGoogle(token:any){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    )
  }

  cargarUsuarios(desde: number = 0){

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp =>{
          const usuarios = resp.usuarios.map(
            user => new Usuario(
              user.first_name,
              user.last_name,
              user.pais,
              user.telefono,
              user.numdoc,
              user.email,
              '',
               user.img,
              user.google,
              user.role,
              user.uid
              ));

          return {
            total: resp.total,
            usuarios

          }
        })
      )
  }




  borrarUsuario(usuario: Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers)
  }


  guardarUsuario(usuario: Usuario){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }




  get_user(id:string):Observable<any>{
    const url = `${base_url}/usuarios/${id}`;
    return this.http.get(url, this.headers)
  }

  get_user_data():Observable<any>{
    const url = `${base_url}/usuarios`;
    return this.http.get(url, this.headers)
  }

  set_recovery_token(email):Observable<any>{

    const url = `${base_url}/usuarios/user_token/set/${email}`;
    return this.http.get<any>(url, this.headers)
  }


  verify_token(email,codigo):Observable<any>{
    const url = `${base_url}/usuarios/user_verify/token/${email}/${codigo}`;
    return this.http.get<any>(url, this.headers)
  }

  change_password(email,data):Observable<any>{debugger
    const url = `${base_url}/usuarios/user_password/change/${email}/${data}`;
    return this.http.put<any>(url, this.headers)
  }





}
