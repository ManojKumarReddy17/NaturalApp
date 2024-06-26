import { RxJsonSchema } from "rxdb"
import { Areas } from "../app/Models/areas";

const allAreas : RxJsonSchema<Areas> = {
    title: 'Areas Schema',
    version: 0,
    type: 'object',
    properties: {
        id: { type:'string' },
        areaName: {type:'string' }
        
    },
    primaryKey: 'id',
};

export default allAreas;