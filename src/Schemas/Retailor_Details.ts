import { RxJsonSchema } from "rxdb"
import { RetailorDetails } from "../app/Models/retailor-details";

const allretailorDetails : RxJsonSchema<RetailorDetails> = {
    title: 'Retailor Details Schema',
    version: 0,
    type: 'object',
    properties: {

        id: { type: 'string' },
        retailor: { type: 'string' },
        address: { type: 'string' },
        phonenumber: { type: 'string' },
        totalAmount: { type: 'string' },
        executive: { type: 'string' },
        distributor: { type: 'string' },
        orderBy:{type:'string'},
        createdDate:{type: 'Date'},
        rId:{type:'string'},
        aId:{type:'string'},
        area:{type:'string'}

    },
    primaryKey: 'id',
};

export default allretailorDetails;