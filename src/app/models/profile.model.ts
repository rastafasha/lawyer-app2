export class Profile {
  id!: number;
  user_id!: number;
  nombre: string = "";
  username: string = "";
  surname: string = "";
  email: string = "";
  n_doc: number = 0;
  created_at: string = "";
  direccion: string = "";
  pais: string = "";
  estado: string = "";
  ciudad: string = "";
  telhome: string = "";
  telmovil: string = "";
  image: string = "";
  status: string = "";
  rating: string = "";
  redessociales: RedesSociales = new RedesSociales();
  precios: Precios = new Precios();

}

export class RedesSociales {
    id!: number;
    title: string = "";
    url: string = "";
  
  }
export class Precios {
    id!: number;
    tarifa: string = "";
    precio: number = 0;
  
  }
