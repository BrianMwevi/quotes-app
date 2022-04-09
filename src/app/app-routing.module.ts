import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuoteDetailComponent } from './components/quote-detail/quote-detail.component';
import { QuotesComponent } from './components/quotes/quotes.component';

const routes: Routes = [
  { path: '', component: QuotesComponent },
  { path: 'account', component: AccountComponent },
  { path: 'quote/detail/:id', component: QuoteDetailComponent },
  { path: 'quote/add', component: AddQuoteComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
