import { Injectable } from '@angular/core';
import { RxCollection,RxCollectionCreator, RxDatabase,addRxPlugin,createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import details from '../Schemas/Userdetails';
import allProducts from '../Schemas/Products';
import { UserDetails } from '../app/Models/user-details';
import { Product } from '../app/Models/product';
import { RetailorDetails } from '../app/Models/retailor-details';
import allNotifications from '../Schemas/NotificationSchema';
import { Reports } from '../app/Models/reports';
import allreports from '../Schemas/Reports';
import allAreas from '../Schemas/Areas';
import { Areas } from '../app/Models/areas';
import allretailorDetails from '../Schemas/Retailor_Details';
import { ProductDetails } from '../app/Models/product-details';
import alldsrDetails from '../Schemas/DsrDetails';

@Injectable({
  providedIn: 'root'
})

export class RXDBService {
  userDetailCollection: RxCollection<UserDetails,any,any>;
  productCollection: RxCollection<Product,any,any>;
  notificationCollection: RxCollection<Notification,any,any>
  reportsCollection: RxCollection<Reports,any,any>
  areasCollection: RxCollection<Areas,any,any>
  dsrCollection:RxCollection<ProductDetails,any,any>;
  retailorCollection: RxCollection<RetailorDetails,any,any>;

  constructor() { }

    db:RxDatabase |null = null;
    
    public async ensureIsDatabaseCreated(){
      if(!this.db){
        this.db = await createRxDatabase({
       
          name: 'naturaldb',
          storage: getRxStorageDexie(),
          ignoreDuplicate: true 
      });
      console.log('database is successfully created');
      await this.addCollections();   
      }
      }

      async addCollections(){
        const {user, prod, notifi,reports,areas,retailors,dsr} = await this.db.addCollections({

          user : {
            schema : details
          },
          prod : {
            schema : allProducts
          },
          notifi:{
            schema : allNotifications
          },
                    reports:{
            
            schema:allreports
          },
          areas:{
            schema:allAreas
          },
          retailors:{
            schema: allretailorDetails
          },
          dsr:{
            schema:alldsrDetails
          }
          
        });
        this.userDetailCollection = user;
        this.productCollection = prod;
        this.notificationCollection = notifi;
        this.reportsCollection = reports;
        this.areasCollection = areas;
        this.retailorCollection = retailors;
        this.dsrCollection = dsr;
        console.log("collections created successfully");
      }
    
}
