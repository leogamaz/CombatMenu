import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  contentChild,
} from '@angular/core';

import OBR, { ContextMenuContext, Metadata } from '@owlbear-rodeo/sdk';
import { PlayerModel } from './shared/core/models/playerModel';
import { ContextMenuService } from './shared/core/services/OBR/context-menu/context-menu.service';
import { SyncPlayersService } from './shared/core/services/OBR/sync-players/sync-players.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'status-character';
  metadata = 'com.simple.combat.menu/metadata';
  contextMenu = 'com.simple.combat.menu/contextMenu';
  id = 'com.simple.combat.menu';

  constructor(private contextMenuService: ContextMenuService, private syncPlayersService : SyncPlayersService) {} // Certifique-se de injetar o serviço no construtor

  ngOnInit(): void {

    OBR.onReady(() => {
      this.contextMenuService.createMenu()
      this.syncPlayersService.syncPlayers()
    });
  }
}
