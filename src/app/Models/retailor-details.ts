export class RetailorDetails {
    id: string;
    retailor: string;
    address: string;
    phonenumber: string;
    totalAmount: string;
    executive: string;
    distributor: string;
    orderBy: string;
    createdDate: Date;
    area:string;
 
    constructor(Id : string,Name:string,Address:string,Phonenumber:string,TotalAmount:string,Distributor:string,Executive:string,OrderBy:string,Createddate:Date,Area:string){
        this.id = Id;
        this.retailor = Name;
        this.address = Address;
        this.phonenumber = Phonenumber;
        this.totalAmount = TotalAmount;
        this.distributor = Distributor;
        this.executive = Executive;
        this.orderBy = OrderBy;
        this.createdDate = Createddate;
        this.area = Area;

        
    }
}
