import { Component, OnInit } from '@angular/core';

import { QuotesService } from 'src/app/services/quotes.service';

import { Quote } from 'src/app/models/Quote';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  loading: boolean = true;
  quotes: Quote[] = [];
  user: any;
  constructor(
    private quoteService: QuotesService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
      this.loading = false;
    });
    this.userService.afAuth.authState.subscribe((user) => (this.user = user));
  }

  upvote(quote: Quote, userId: string) {
    quote.dislikes = quote.dislikes?.filter((like) => like !== userId);
    quote.likes?.indexOf(userId) === -1
      ? quote.likes?.push(userId)
      : (quote.likes = quote.likes?.filter((like) => like !== userId));
    this.quoteService.updateQuote(quote);
  }

  downvote(quote: Quote, userId: string) {
    quote.likes = quote.likes?.filter((like) => like !== userId);
    quote.dislikes?.indexOf(userId) === -1
      ? quote.dislikes?.push(userId)
      : (quote.dislikes = quote.dislikes?.filter((like) => like !== userId));
    this.quoteService.updateQuote(quote);
  }

  delete(quote: Quote) {
    confirm('Are you sure? ') ? this.quoteService.deleteQuote(quote) : false;
  }
}
