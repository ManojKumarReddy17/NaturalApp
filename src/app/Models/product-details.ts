
export class ProductDetails {
id:string;
executive:string; 
distributor:string;
retailor:string;
rId :string;
aId:string;
orderBy:string;
totalAmount: number;
createdDate:Date;
dsr:any;
product:productDetails[]=[];   
area: string;

}
export interface productDetails{
    product : string;
    price: any;
    quantity: any;
    dsr:any

}
