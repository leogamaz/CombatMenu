import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CombatMenuPlayerComponent } from './shared/components/combat-menu-player/combat-menu-player.component';
import { UpdatePlayersService } from './shared/core/services/OBR/update-players/update-players.service';
import { ListaPlayersService } from './shared/core/services/OBR/lista-players/lsita-players.service';
import { ContextMenuService } from './shared/core/services/OBR/context-menu/context-menu.service';

@NgModule({
  declarations: [AppComponent, CombatMenuPlayerComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    UpdatePlayersService,
    ListaPlayersService,
    ContextMenuService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
