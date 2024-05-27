import { Component, OnInit } from '@angular/core';
import { ContextMenuService } from './shared/core/services/OBR/context-menu/context-menu.service';
import OBR from '@owlbear-rodeo/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'status-character';

  constructor(private contextMenuService: ContextMenuService) {}  // Certifique-se de injetar o serviço no construtor

  ngOnInit(): void {
      OBR.onReady(() => {
        console.log('olaaa')
        this.contextMenuService.setupContextMenu();
      })
  }

}
