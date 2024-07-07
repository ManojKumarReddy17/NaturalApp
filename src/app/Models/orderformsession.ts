
import { Areas } from "./areas";


export class orderformsession {
    
    rId: string;
    aId:string;
    createdDate: Date ;
    retailor:any;
    area:Areas[]=[];
  selectedproducts: import("c:/New_Angular/NaturalApp/src/app/Models/product").Product[];
    constructor(rId: string, aId: string, createdDate: Date) {
        this.rId = rId;
        this.aId = aId;
        this.createdDate = createdDate;
        
      }
    
  
}