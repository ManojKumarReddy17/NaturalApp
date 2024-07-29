import { RxJsonSchema } from "rxdb"
import { dsReports, Reports } from "../app/Models/reports";

const allreports : RxJsonSchema<Reports> = {
    title: 'Reports Schema',
    version: 0,
    type: 'object',
    properties: {
        areaName: { type: 'string' },
        executiveName:{type:'string'},
        distributorName: { type: 'string'},
        retailerName: { type: 'string' },
        createdDate: { type: 'string' },
        product: { type: 'string' },
        product_Name: { type: 'string' },
        price: { type: 'string' },
        quantity: { type: 'string' },
        saleAmount: { type: 'string' },
        endDate: { type: 'string' },
        string: { type: 'string' },
    },
    primaryKey: 'areaName',
};
 export default allreports;


const dallreports : RxJsonSchema<dsReports> = {
    title: 'Reports Schema',
    version: 0,
    type: 'object',
    properties: {
        area: { type: 'string' },
        // executive: { type: 'string' },
        executive:{type:'string'},
        distributor: { type: 'string'},
         retailor: { type: 'string' },
        createdDate: { type: 'string' },
        product: { type: 'string' },
        product_Name: { type: 'string' },
        price: { type: 'string' },
        quantity: { type: 'string' },
        saleAmount: { type: 'string' },
        productType:{type:'string'},
        endDate: { type: 'string' },
        string: { type: 'string' },
    },
    primaryKey: 'area',
};

// export default dallreports;