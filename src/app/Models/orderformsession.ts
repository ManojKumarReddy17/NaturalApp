
import { Areas } from "./areas";


export class orderformsession {
    
    rId: string;
    aId:string;
    createdDate: Date ;
    retailor:any;
    area:Areas[]=[];
    constructor(rId: string, aId: string, createdDate: Date) {
        this.rId = rId;
        this.aId = aId;
        this.createdDate = createdDate;
        
      }
    
  
}