import { User } from "./user";

export class subcriptionPaypal{

    constructor(

        public email: string,
        public monto: number,
        public orderID: string,
        public payerID: string,
        public plan_id: string,
        public status: string,
        public usuario: User,
        public createdAt: Date,
        public updatedAt: Date,
        public _id?: string
    
    ){}
}