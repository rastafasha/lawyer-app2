import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-fallo',
    templateUrl: './fallo.component.html',
    styleUrls: ['./fallo.component.css'],
    standalone: true,
     imports: [
        CommonModule,
      ],
})
export class FalloComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
