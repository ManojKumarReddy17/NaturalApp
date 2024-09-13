export class Reports {
    // area:string;
    // executive:string;
    // distributor:string;
    // retailor:string;
    // createdDate:string;
    // product:string;
    // product_Name:string;
    // price:string;
    // quantity;string;
    // saleAmount:string;
    // endDate:string;
    // constructor(Area:string,Executive:string,Distributor:string,Retailor:string,CreatedDate:string,Product:string,Product_Name:string,Price:string,Quantity:string,SaleAmount:string,Enddate:string){
    //     this.area=Area;
    //     this.executive=Executive;
    //     this.distributor=Distributor;
    //     this.retailor=Retailor;
    //     this.createdDate = CreatedDate;
    //     this.product = Product;
    //     this.product_Name = Product_Name;
    //     this.price = Price;
    //     this.quantity = Quantity;
    //     this.saleAmount = SaleAmount;
    //     this.endDate = Enddate;

    // }
    areaName:string;
    // executive:string;
    executiveName:string;
    distributorName:string;
    retailerName:string;
    createdDate:string;
    product:string;
    product_Name:string;
    price:string;
    quantity;string;
    saleAmount:string;
    endDate:string;
    constructor(ExecutiveName:string,AreaName:string,DistributorName:string,RetailorName:string,CreatedDate:string,Product:string,Product_Name:string,Price:string,Quantity:string,SaleAmount:string,Enddate:string){
        this.areaName=AreaName;
        // this.executive=Executive;
        this.executiveName=ExecutiveName;
        this.distributorName=DistributorName;
        this.retailerName=RetailorName;
        this.createdDate = CreatedDate;
        this.product = Product;
        this.product_Name = Product_Name;
        this.price = Price;
        this.quantity = Quantity;
        this.saleAmount = SaleAmount;
        this.endDate = Enddate;

    }
}
export class dsReports {
    area:string;
    executive:string;
    distributor:string;
    retailor:string;
    createdDate:string;
    product:string;
    product_Name:string;
    price:string;
    quantity;string;
    productType:string;
    saleAmount:string;
    endDate:string;
    constructor(Area:string,Executive:string,Distributor:string,Retailor:string,CreatedDate:string,Product:string,Product_Name:string,Price:string,Quantity:string,ProductType:string,SaleAmount:string,Enddate:string){
        this.area=Area;
        this.executive=Executive;
        this.distributor=Distributor;
        this.retailor=Retailor;
        this.createdDate = CreatedDate;
        this.product = Product;
        this.product_Name = Product_Name;
        this.price = Price;
        this.quantity = Quantity;
        this.productType=ProductType
        this.saleAmount = SaleAmount;
        this.endDate = Enddate;

    }
}

  export class ResponseModel {
    firstName: string;
    totalSaleAmount: number;
    constructor(FirstName:string,TotalSaleAmount:number){
     this.firstName=FirstName;
     this.totalSaleAmount=TotalSaleAmount;
    }
  }
