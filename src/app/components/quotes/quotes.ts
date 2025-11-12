import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteService } from '../../services/quote';

@Component({
  selector: 'app-quotes',
  imports: [CommonModule,FormsModule],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes {

  quotes: any[] = [];

  
}
