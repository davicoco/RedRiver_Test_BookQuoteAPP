import { Component } from '@angular/core';
import { QuoteService } from '../../services/quote';

@Component({
  selector: 'app-quotes',
  imports: [],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes {

  quotes: any[] = [];

  
}
