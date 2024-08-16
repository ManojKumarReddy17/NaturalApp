
import { Areas } from "./areas";
import { Product } from "./product";


export class orderformsession {
    
    rId: string;
    aId:string;
    createdDate: any ;
    retailor:any;
    area:Areas[]=[];
    selectedproducts: Product[];
    constructor(rId: string, aId: string, createdDate: any) {
        this.rId = rId;
        this.aId = aId;
        this.createdDate = createdDate;
        
      }
    
  
}