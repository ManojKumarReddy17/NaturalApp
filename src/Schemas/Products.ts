import { RxJsonSchema } from "rxdb"
import { Product } from "../app/Models/product";

const allProducts : RxJsonSchema<Product> = {
    title: 'Products Schema',
    version: 0,
    type: 'object',
    properties: {
        id: { type: 'any' },
        productName: { type: 'string' },
        weight: { type: 'any' },
        price: { type: 'any' },
        quantity: { type: 'any' },
        subtotal: { type: 'any' },
        image: {type: 'any'},
        total:{type:'any'},
        dsr:{type:'any'}
    },
    primaryKey: 'id',
};

export default allProducts;