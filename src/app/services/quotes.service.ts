import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quote } from '../models/Quote';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotesCollection: AngularFirestoreCollection<Quote>;
  private quoteDoc!: AngularFirestoreDocument<Quote>;
  quote!: Observable<Quote>;
  quotes!: Observable<Quote[]>;

  constructor(private afs: AngularFirestore, private router: Router) {
    this.quotesCollection = afs.collection<Quote>('quotes', (ref) =>
      ref.orderBy('createdDate', 'desc')
    );
  }

  addQuote(quote: Quote) {
    this.quotesCollection
      .add(quote)
      .then((result) => this.router.navigate(['/']));
  }

  updateQuote(quote: Quote) {
    this.quoteDoc = this.afs.doc<Quote>(`quotes/${quote.id}`);
    this.quoteDoc.update(quote);
  }

  deleteQuote(quote: Quote) {
    this.quoteDoc = this.afs.doc<Quote>(`quotes/${quote.id}`);
    this.quoteDoc.delete();
  }

  getQuotes(): Observable<Quote[]> {
    return (this.quotes = this.quotesCollection.snapshotChanges().pipe(
      map((changes) =>
        changes.map((quotes) => {
          const data = quotes.payload.doc.data() as Quote;
          data.id = quotes.payload.doc.id;
          return data;
        })
      )
    ));
  }
}
