import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-execute-payment',
    templateUrl: './execute-payment.component.html',
    styleUrls: ['./execute-payment.component.css'],
    standalone: true,
     imports: [
        CommonModule,
      ],
})
export class ExecutePaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
