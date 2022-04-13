import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TimeagoModule } from 'ngx-timeago';
import { FlashMessagesModule } from 'flash-messages-angular';

import { UsersService } from './services/users.service';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { QuoteDetailComponent } from './components/quote-detail/quote-detail.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccountComponent,
    ProfileComponent,
    QuotesComponent,
    QuoteDetailComponent,
    AddQuoteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TimeagoModule.forRoot(),
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
