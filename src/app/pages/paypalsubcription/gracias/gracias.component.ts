import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gracias',
    templateUrl: './gracias.component.html',
    styleUrls: ['./gracias.component.css'],
    standalone: true,
    imports: [
        CommonModule,
      ],
})
export class GraciasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
