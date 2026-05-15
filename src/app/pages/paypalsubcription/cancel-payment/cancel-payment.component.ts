import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cancel-payment',
    templateUrl: './cancel-payment.component.html',
    styleUrls: ['./cancel-payment.component.css'],
    standalone: true,
     imports: [
        CommonModule,
      ],
})
export class CancelPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
