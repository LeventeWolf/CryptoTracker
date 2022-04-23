import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Trade} from "../models/trade";

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  collectionName = 'Trades';

  constructor(private afs: AngularFirestore) {
  }

  getDate() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
  }

  create(trade: Trade) {
    trade.id = this.afs.createId();
    trade.date = this.getDate();

    return this.afs.collection<Trade>(this.collectionName).doc(trade.id).set(trade);
  }

  getAllByUserID(userID: any) {
    return this.afs.collection<Trade>(this.collectionName, ref => ref.where('userID', '==', userID)
          .orderBy('date', 'asc'))
          .valueChanges();
  }

  getAll() {
    return this.afs.collection<Trade>(this.collectionName).valueChanges();
  }

  update(trade: Trade) {
    return this.afs.collection<Trade>(this.collectionName).doc(trade.id).set(trade);
  }

  delete(id: string) {
    return this.afs.collection<Trade>(this.collectionName).doc(id).delete();
  }
}
