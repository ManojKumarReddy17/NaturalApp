export class Reports {
    area:string;
    executive:string;
    distributor:string;
    retailor:string;
    createdDate:string;
    product:string;
    product_Name:string;
    price:string;
    quantity;string;
    saleAmount:string;
    endDate:string;
    constructor(Area:string,Executive:string,Distributor:string,Retailor:string,CreatedDate:string,Product:string,Product_Name:string,Price:string,Quantity:string,SaleAmount:string,Enddate:string){
        this.area=Area;
        this.executive=Executive;
        this.distributor=Distributor;
        this.retailor=Retailor;
        this.createdDate = CreatedDate;
        this.product = Product;
        this.product_Name = Product_Name;
        this.price = Price;
        this.quantity = Quantity;
        this.saleAmount = SaleAmount;
        this.endDate = Enddate;

    }
}
