import { CardItem } from './card-item.model';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class ProfileService {
 private collection: AngularFirestoreCollection<CardItem>;
  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection<CardItem>('cards');
  }

  getCards() {
    return this.collection.valueChanges();
  }

  addCard(card: CardItem) {
    this.collection.add(JSON.parse(JSON.stringify(card)));
  }

}
