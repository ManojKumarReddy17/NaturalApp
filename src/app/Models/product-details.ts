
export class ProductDetails {
id:string;
executive:string; 
distributor:string;
retailor:string;
orderBy:string;
totalAmount: number;
createdDate:Date;
dsr:any;
product:productDetails[]=[];   

}
export interface productDetails{
    product : string;
    price: any;
    quantity: any;
    dsr:any;
}
