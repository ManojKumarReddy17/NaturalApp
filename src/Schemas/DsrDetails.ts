import { RxJsonSchema } from 'rxdb';

interface DsrDetails {
    id: string;
    retailor: string;
    address: string;
    phonenumber: string;
    totalAmount: string;
    executive: string;
    distributor: string;
    orderBy: string;
    createdDate: string; 
    rId: string;
    aId: string;
    area: string;
}

const alldsrDetails: RxJsonSchema<DsrDetails> = {
    title: 'Dsr Details Schema',
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
        orderBy: { type: 'string' },
        createdDate: { type: 'string', format: 'date-time' },
        rId: { type: 'string' },
        aId: { type: 'string' },
        area: { type: 'string' }
    },
    primaryKey: 'id'
};

export default alldsrDetails;
