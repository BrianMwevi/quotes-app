import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { QuotesService } from '../../services/quotes.service';

import { User } from 'src/app/models/User';
import { Quote } from 'src/app/models/Quote';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css'],
})
export class AddQuoteComponent implements OnInit {
  user: any;
  quote: Quote = {
    text: '',
    author: {
      username: '',
      id: '',
    },
    published: false,
    createdDate: '',
    likes: [],
    dislikes: [],
  };
  constructor(
    private userService: UsersService,
    private quoteService: QuotesService
  ) {}

  ngOnInit(): void {
    this.userService.afAuth.user.subscribe((user) => (this.user = user));
  }

  onSubmit(text: string) {
    this.quote.author = {
      username: this.user.displayName,
      id: this.user.uid,
    };
    this.quote.createdDate = Date.now();
    this.quoteService.addQuote(this.quote);
  }
}
