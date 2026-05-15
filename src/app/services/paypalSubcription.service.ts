import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { generateSubcription, planPaypalSubcription, productPaypalSubcription } from '../models/planPaypalSubcription';
import { environment } from '../environments/environment';

const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class PaypalSubcriptionService {

  public planPaypal!: planPaypalSubcription;
  public data!: planPaypalSubcription;
  public generateSubcription!: generateSubcription;
  public productPaypal!: productPaypalSubcription;

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'X-PAYPAL-SECURITY-CONTEXT': '{"consumer":{"accountNumber":1181198218909172527,"merchantId":"5KW8F2FXKX5HA"},"merchant":{"accountNumber":1659371090107732880,"merchantId":"2J6QB8YJQSJRJ"},"apiCaller":{"clientId":"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP","appId":"APP-6DV794347V142302B","payerId":"2J6QB8YJQSJRJ","accountNumber":"1659371090107732880"},"scopes":["https://api-m.paypal.com/v1/subscription/.*","https://uri.paypal.com/services/subscription","openid"]}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PayPal-Request-Id': 'PRODUCT-18062019-001',
        'Prefer': 'return=representation'
      }
    }
  }

  get type(): 'PHYSICAL' | 'DIGITAL' | 'SERVICE' {
    return this.productPaypal.type;
  }


  getPlanPaypals()  {
    const url = `${baseUrl}/paypal/plans`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, planPaypals: planPaypalSubcription}) => resp.planPaypals)
      )
  }

  getPlanPaypal(id: string) {
    const url = `${baseUrl}/paypal/plan/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, planPaypal: planPaypalSubcription}) => resp.planPaypal)
        );
  }

  updatePlan(planPaypal: planPaypalSubcription) {
    const url = `${baseUrl}/paypal/editar-plan/${planPaypal.id}`;
    return this.http.patch(url, planPaypal, this.headers);

  }

  createPlanSubcription(planPaypal:any) {
    const url = `${baseUrl}/paypal/create-plan`;
    return this.http.post(url, planPaypal, this.headers);

  }
  createCompra(planPaypal:any) {
    const url = `${baseUrl}/paypal/create-payment`;
    return this.http.post(url, planPaypal, this.headers);

  }
 ejecutaPago(orderId: string) {
  const url = `${baseUrl}/paypal/execute-payment`; 
  
  // Envolvemos el string en un objeto JSON válido
  const body = { token: orderId }; 
  
  return this.http.post(url, body, this.headers);
}
  


  

  //products

  createProducSubcription(productPaypal:productPaypalSubcription) {
    const url = `${baseUrl}/paypal/create-product`;
    return this.http.post(url, productPaypal, this.headers);

  }
  updateProduct(productPaypal: productPaypalSubcription) {
    const url = `${baseUrl}/paypal/editar-product/${productPaypal.id}`;
    return this.http.put(url, productPaypal, this.headers);

  }

  getProductPaypal(id: string) {
    const url = `${baseUrl}/paypal/product/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, planPaypal: planPaypalSubcription}) => resp.planPaypal)
        );
  }

  getProductPaypals()  {
    const url = `${baseUrl}/paypal/products`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, productPaypal: productPaypalSubcription}) => resp.productPaypal)
      )
  }
  

  //generateSubcriptionPaypal
  generateSubcriptionPaypal(generateSubcription:any) {
    const url = `${baseUrl}/paypal/generate-subscription`;
    return this.http.post(url, generateSubcription, this.headers);

  }

  activar(id: planPaypalSubcription):Observable<any> {
    // const url = `${PAYPAL_API}/v1/billing/plans/${id}/activate`;
    const url = `${baseUrl}/paypal/activar-plan/${id}`;
    return this.http.post(url, this.headers);

  }
  desactivar(id: planPaypalSubcription):Observable<any> {
    // const url = `${PAYPAL_API}/v1/billing/plans/${id}/deactivate`;
    const url = `${baseUrl}/paypal/desactivar-plan/${id}`;
    return this.http.post(url, this.headers);

  }
  
// crud

  getPlans()  {
    const url = `${baseUrl}/planpaypal`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, planPaypals: planPaypalSubcription}) => resp.planPaypals)
      )
  }
  
  




}
