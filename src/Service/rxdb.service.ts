import { Injectable } from '@angular/core';
import { RxCollection, RxCollectionCreator, RxDatabase, addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import details from '../Schemas/Userdetails';
import allProducts from '../Schemas/Products';
import { UserDetails } from '../app/Models/user-details';
import { Product } from '../app/Models/product';
import { RetailorDetails } from '../app/Models/retailor-details';



@Injectable({
  providedIn: 'root'
})
export class RXDBService {
  userDetailCollection: RxCollection<UserDetails,any,any>;
  productCollection: RxCollection<Product,any,any>;
  retailorListCollection:RxCollection<RetailorDetails,any,any>;

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
        const {user, prod} = await this.db.addCollections({
          user : {
            schema : details
          },
          prod : {
            schema : allProducts
          },
        });
        this.userDetailCollection = user;
        this.productCollection = prod;
        console.log("collections created successfully");
      }
    
}