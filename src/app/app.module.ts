import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CombatMenuPlayerComponent } from './shared/components/combat-menu-player/combat-menu-player/combat-menu-player.component';

@NgModule({
  declarations: [AppComponent, CombatMenuPlayerComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
