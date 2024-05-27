import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ContextMenuService } from './shared/core/services/OBR/context-menu/context-menu.service';
import OBR, { Metadata } from '@owlbear-rodeo/sdk';
import { ListaPlayersService } from './shared/core/services/OBR/lista-players/lsita-players.service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'status-character';
  metadata = 'com.tutorial.initiative-tracker/metadata'

  constructor(private contextMenuService: ContextMenuService, private listaPlayersService: ListaPlayersService) {}  // Certifique-se de injetar o serviço no construtor

  ngOnInit(): void {
      OBR.onReady(() => {
        this.contextMenuService.setupContextMenu();
        this.listaPlayersService.setupInitiativeList();

      })
  }

  

}
