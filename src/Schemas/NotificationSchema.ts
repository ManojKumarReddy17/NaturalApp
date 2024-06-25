import { RxJsonSchema } from "rxdb"
import { Notifications } from "../app/Models/notifications";

const allNotifications : RxJsonSchema<Notifications> = {
    title: 'Notification Schema',
    version: 0,
    type: 'object',
    properties: {
        id: { type: 'any' },
        subject: { type: 'string' },
        body: { type: 'any' }
    },
    primaryKey: 'id',
};

export default allNotifications;