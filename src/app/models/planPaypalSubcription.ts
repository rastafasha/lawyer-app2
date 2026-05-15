export class planPaypalSubcription{
   
    data: any;
    plans: any;
    constructor(

        public billing_cycles: billing_cycles,
        public create_time: Date,
        public id: string ,
        public name: string,
        public payment_preferences:payment_preferences,
        public product_id: string,
        public taxes: taxes,
        public status: string,
        public fixed_price: pricing_scheme,
        public frequency: frequency,
    
    ){}

}

export class billing_cycles{
    frequency!: frequency;
    tenure_type!: "REGULAR";
    sequence!: 1;
    total_cycles!: number;
    pricing_scheme!:pricing_scheme;
    
  }
export class frequency {
    interval_unit: any;
    interval_count!: number;
}
export class pricing_scheme {
    fixed_price?: {
        value: number, //"3", // PRECIO MENSUAL QUE COBRAS 3.30USD
        currency_code: "USD"
    }
}
export class payment_preferences {
    auto_bill_outstanding?: true;
    setup_fee?:setup_fee;
    setup_fee_failure_action?: "CONTINUE";
    payment_failure_threshold?: 3
}
export class setup_fee {
    value?: number;
    currency_code?: "USD";
}
export class taxes {
    percentage?: number; //"10", // 10USD + 10% = 11 USD
    inclusive?: false
}



export class productPaypalSubcription{
    products: any;
    constructor(

        public id: string,
        public name: string,
        public description: string,
        public image_url: string,
        public type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE',
    
    ){}

}

export class generateSubcription{
    constructor(

        public id: string ,
        public plan_id: string ,
        public name: string,
        public surname: string,
        public email_address: string,
    
    ){}

}

export class subcriptionGenerated{
    constructor(
        public id: string ,
        public links: links ,
        public status: string,
        public create_time: Date,
    
    ){}

}
export class links{
    constructor(
        public id: string ,
        public href: string ,
        public method: string,
        public rel: string,
    
    ){}

}

export class geSubcription{
    constructor(
        public id: string ,
        public idSubcription: string ,
        public name: string ,
        public surname: string ,
        public email: string ,
        public links: string ,
        public status: string,
        public create_time: string,
    
    ){}

}




