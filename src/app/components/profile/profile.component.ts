import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { subscribeOn } from 'rxjs';

import { Quote } from '../../models/Quote';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loaded: boolean = false;
  userQuotes: any;
  user: any;

  constructor(
    private userService: UsersService,
    private quoteService: QuotesService
  ) {}

  ngOnInit(): void {
    this.userService.afAuth.authState.subscribe((user) => (this.user = user));
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.userQuotes = quotes.filter(
        (quote) => quote.author.id === this.user?.uid
      );
      this.loaded = true;
    });
  }

  delete(quote: Quote) {
    confirm('Are you sure you want to delete?')
      ? this.quoteService.deleteQuote(quote)
      : false;
  }
}
