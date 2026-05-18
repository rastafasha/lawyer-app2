import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class PaywallInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Detectamos el error 403 y nuestra bandera personalizada 'limiteAlcanzado'
        if (error.status === 403 && error.error.limiteAlcanzado) {
          
          // Opción A: Redirigir a la página de pago
          // this.router.navigate(['/plan-subcripcion']); 
          console.warn('Límite alcanzado, pero permitimos que el usuario se quede en la página.');

          // Opción B: Podrías abrir un Modal de suscripción usando un servicio
          // this.subscriptionModalService.open();
        }
        
        return throwError(() => error);
      })
    );
  }
}
