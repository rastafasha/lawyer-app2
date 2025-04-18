import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
const baseUrl = environment.url_servicios;
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public Document!: Document;
    
  
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
  
  
    getDocuments() {
      const url = `${baseUrl}/documents`;
      return this.http.get<any>(url,this.headers)
        .pipe(
          map((resp:{ok: boolean, documents: Document[]}) => resp.documents)
        )
    }
    
  
    getDocument(_id: number) {
      const url = `${baseUrl}/document/show/${_id}`;
      return this.http.get<any>(url, this.headers)
        .pipe(
          map((resp:{ok: boolean, document: Document}) => resp.document)
          );
    }
    getDocumentsByUser(_id: number) {
      const url = `${baseUrl}/document/showbyuser/${_id}`;
      return this.http.get<any>(url, this.headers)
        .pipe(
          map((resp:{ok: boolean, documents: Document}) => resp.documents)
          );
    }

    getAllClientReportByPatient(
      user_id :number,
      page = 1,
      created_at = '',
      name_category?: string,
      name_file?: string
    ) {
      let LINK = '';
  
      if (created_at) {
        LINK += '&created_at=' + created_at;
      }
      if (name_file) LINK += `&name_file=${name_file}`;
      
      if (name_category) LINK += `&name_category=${name_category}`;

      const URL =
        baseUrl +
        '/document/showByUserFiltered/' +
        user_id +
        '/?page=' +
        page +
        LINK;
      return this.http.get<any>(URL);

      // return this.http.get<any>(URL, this.headers)
      //   .pipe(
      //     map((resp:{ok: boolean, documents: Document}) => resp.documents)
      //     );
    }


    getDocumentsByUserCategory(user_id: number, name_category:string) {
      const url = `${baseUrl}/document/showByCategory/${user_id}/${name_category}`;
      return this.http.get<any>(url, this.headers)
        .pipe(
          map((resp:{ok: boolean, documents: Document}) => resp.documents)
          );
    }
  
    getDocumentActivos() {
      const url = `${baseUrl}/document/activos`;
      return this.http.get<any>(url,this.headers)
        .pipe(
          map((resp:{ok: boolean, documents: Document[]}) => resp.documents)
        )
    }
    
  
    createDocument(data:any){
      const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      const URL = baseUrl+'/document/store';
      return this.http.post(URL,data, {headers:headers});
    }
    updateDocument( data:any, document_id:any,){
      const headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
      const URL = baseUrl+'/document/update/'+document_id;
      return this.http.post(URL,data,{headers:headers});
    }
    updateStatus( data:any, document_id:number){
  
      const url = `${baseUrl}/document/update/status/${document_id}`;
      return this.http.put(url,  data, this.headers);
    }
  
    deleteDocument(_id: string) {
      const url = `${baseUrl}/document/destroy/${_id}`;
      return this.http.delete(url, this.headers);
    }
}
