import { RxJsonSchema } from "rxdb"
import { Reports } from "../app/Models/reports";

const allreports : RxJsonSchema<Reports> = {
    title: 'Reports Schema',
    version: 0,
    type: 'object',
    properties: {
        area: { type: 'string' },
        executive: { type: 'string' },
        distributor: { type: 'string' },
        retailor: { type: 'string' },
        createdDate: { type: 'string' },
        product: { type: 'string' },
        product_Name: { type: 'string' },
        price: { type: 'string' },
        quantity: { type: 'string' },
        saleAmount: { type: 'string' },
        endDate: { type: 'string' },
        string: { type: 'string' },
    },
    primaryKey: 'area',
};

export default allreports;