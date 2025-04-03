export class Solicitud {
    id!: number;
    user_id!: number;
    pedido: Pedido = new Pedido();
  
  }
  
  export class Pedido {
    id!: number;
    item_tarifa: string = "";
    precio: number = 0;
    
    }
  
  