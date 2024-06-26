import { Injectable } from '@angular/core';
import { RxCollection, RxCollectionCreator, RxDatabase, addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import details from '../Schemas/Userdetails';
import allProducts from '../Schemas/Products';
import { UserDetails } from '../app/Models/user-details';
import { Product } from '../app/Models/product';
import { RetailorDetails } from '../app/Models/retailor-details';
import allNotifications from '../Schemas/NotificationSchema';
<<<<<<< Updated upstream
import { Reports } from '../app/Models/reports';
import allreports from '../Schemas/Reports';
import allAreas from '../Schemas/Areas';
import { Areas } from '../app/Models/areas';


=======
import allretailorDetails from '../Schemas/Retailor_Details';
import { ProductDetails } from '../app/Models/product-details';
import alldsrDetails from '../Schemas/DsrDetails';
>>>>>>> Stashed changes



@Injectable({
  providedIn: 'root'
})
export class RXDBService {
  userDetailCollection: RxCollection<UserDetails,any,any>;
  productCollection: RxCollection<Product,any,any>;
<<<<<<< Updated upstream
  notificationCollection: RxCollection<Notification,any,any>
  reportsCollection: RxCollection<Reports,any,any>
  areasCollection: RxCollection<Areas,any,any>
=======
  notificationCollection: RxCollection<Notification,any,any>;
  retailorCollection: RxCollection<RetailorDetails,any,any>;
  dsrCollection:RxCollection<ProductDetails,any,any>;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        const {user, prod, notifi,reports,areas} = await this.db.addCollections({
=======
        const {user, prod, notifi, retailors,dsr} = await this.db.addCollections({
>>>>>>> Stashed changes
          user : {
            schema : details
          },
          prod : {
            schema : allProducts
          },
          notifi:{
            schema : allNotifications
          },
<<<<<<< Updated upstream
          reports:{
            schema:allreports
          },
          areas:{
            schema:allAreas
=======
          retailors:{
            schema: allretailorDetails
          },
          dsr:{
            schema:alldsrDetails
>>>>>>> Stashed changes
          }
          
        });
        this.userDetailCollection = user;
        this.productCollection = prod;
        this.notificationCollection = notifi;
<<<<<<< Updated upstream
        this.reportsCollection = reports;
        this.areasCollection = areas;
        
=======
        this.retailorCollection = retailors;
        this.dsrCollection = dsr;
>>>>>>> Stashed changes
        console.log("collections created successfully");
      }
    
}