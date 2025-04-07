import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtnComponent } from '../../../shared/backButtn/backButtn.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MenuFooterComponent } from '../../../shared/menu-footer/menu-footer.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { LateralComponent } from '../../../components/lateral/lateral.component';
import { DocumentService } from '../../../services/document.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { Document } from '../../../models/document.model';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from '../../../environments/environment';
import { LoadingComponent } from '../../../shared/loading/loading.component';
const baseUrl = environment.url_servicios;
declare let $:any;  
@Component({
  selector: 'app-documents',
  imports: [
    CommonModule,
        HeaderComponent,
            MenuFooterComponent, 
            BackButtnComponent,
            ReactiveFormsModule,
            FormsModule,
            PdfViewerModule,
            RouterModule,
            LoadingComponent
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  pageTitle= 'Documents';
  isLoading:boolean = false;
  isRefreshing = false;

  valid_form_success = false;
    public text_validation = '';
    public text_success = '';

    FILES:any = [];
  FilesAdded:any = [];
  public file_selected:any;
  public user_files:Document[]= [];
  public user_filesfiltered:Document[]= [];
  public name_category!:string;
  user_id!:number;
  user!:Usuario;

  constructor(
    private authService: AuthService,
    public documentService:DocumentService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public fb: FormBuilder,

  ){
    this.user= this.authService.getUser();

  }
  ngOnInit(): void {
    this.user_id = this.user.id;
    this.getdocumentsbyUser();
  }



  getdocumentsbyUser(){
    this.isLoading = true;
    this.documentService.getDocumentsByUser(this.user_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.FILES =resp.data
      this.isLoading = false;
      //agrupamos por name_category
      this.FILES.forEach((element: any) => {
        if(!this.user_files.find((doc:Document)=>doc.name_category==element.name_category)){
          this.user_files.push(element);
          }
      });
    })
  }

  getDocumentsbyCategory(name_category:string){
    this.documentService.getDocumentsByUserCategory(this.user_id, name_category).subscribe((resp:any)=>{
      this.user_filesfiltered = resp.data;
    })
  }


  processFile($event: any) {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedPdfType = 'application/pdf';
    
    // No limpiamos this.FILES para mantener los archivos existentes
    
    for (const file of $event.target.files) {
      // Verificamos si el archivo es PDF o imagen
      if (file.type === allowedPdfType || allowedImageTypes.includes(file.type)) {
        // Agregamos el archivo solo si no existe ya en el array
        if (!this.FILES.some((f: File) => f.name === file.name && f.size === file.size && f.lastModified === file.lastModified)) {
          this.FILES.push(file);
        }
      } else {
        console.warn(`Tipo de archivo no soportado: ${file.type}`);
      }
    }
  }

  deleteFile(FILE:any){
    this.documentService.deleteDocument(FILE).subscribe((resp:any)=>{
      // this.getAppointment();
      this.getdocumentsbyUser();
    })
    this.FilesAdded.splice(FILE,1);
  }


  selectDoc(FILE:any){
    this.file_selected = FILE;
  }



closeModalDoc(){

  $('#view-doc').hide();
      $("#view-doc").removeClass("show");
      $("#view-doc").css("display", "none !important");
      $(".modal").css("display", "none !important");
      $(".modal-backdrop").remove();
      $("body").removeClass();
      $("body").removeAttr("style");
      this.file_selected = null;
}
  

  save(){
    this.text_validation = '';
    if(!this.name_category){
      this.text_validation = 'Es requerido ingresar un nombre de categoria';
      return;
    }


    if(this.FILES.length === 0){
      this.text_validation = 'Necesitas subir un recurso'
      return;

    }
    const formData = new FormData();
    formData.append('user_id', this.user_id+'');
    formData.append('name_category', this.name_category);

    this.FILES.forEach((file:any, index:number)=>{
      formData.append("files["+index+"]", file);
    });
    this.isLoading = true;
    this.documentService.createDocument(formData).subscribe((resp:any)=>{
      // console.log(resp);
      // this.getAppointment();
      
      if(resp.message == 403){
        // Swal.fire('Actualizado', this.text_validation, 'success');
        this.isLoading = false
        this.text_validation = resp.message_text;

        Swal.fire({
          position: "top-end",
                icon: "warning",
                title: this.text_validation,
                showConfirmButton: false,
                timer: 1500
              });
              
            }else{
              this.isLoading = false
              // Swal.fire('Actualizado', this.text_success, 'success' );
                this.text_success = 'Se guardó la informacion del Laboratorio con la cita'
              // this.text_success = 'actualizado correctamente';
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: this.text_success,
                showConfirmButton: false,
                timer: 1500
              });
              this.getdocumentsbyUser();
          }
    })

  }

  onScrollUp(){
    this.refreshData(); 
  }

  refreshData() { 
    this.isRefreshing = true; 
    // Simulate data fetching 
    setTimeout(() => { 
      this.isRefreshing = false; 
      window.location.reload();
    }, 2000); 
  }
  
  closeReload(){
    this.ngOnInit();
  }


}
