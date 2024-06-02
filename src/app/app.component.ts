import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import OBR, { Metadata } from '@owlbear-rodeo/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'status-character';
  metadata = 'com.tutorial.initiative-tracker/metadata'

  constructor() {}  // Certifique-se de injetar o serviço no construtor

  ngOnInit(): void {
      OBR.onReady(() => {


      })
  }
}
