import { Usuario } from "./usuario.model";

export class Solicitud {
  _id!: string;
  cliente!: Usuario;
  usuario!: Usuario;
  public status?: 'PENDING' | 'REVIEW' | 'VERIFIED' | 'FINISHED';
  pedido: any;
  createdAt!: Date;
  updateddAt!: Date;

}


export class SolicitudesUsers {
  id!: number;
  cliente_id!: number;
  solicitud_id!: number;
  user_id!: number;

}

