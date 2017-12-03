
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { DBService } from './db.service';
import { ClubSearchModule } from './club/club-search/club-search.module';
import { ClubSearchComponent } from './club/club-search/club-search.component';
import { FormsModule } from '@angular/forms';
import { PlayerComponent } from './player/player.component';
import { PlayerSearchComponent } from './player/player-search/player-search.component';
import { PlayerSearchModule } from './player/player-search/player-search.module';
import { AchievementComponent } from './achievement/achievement.component';
import { AchievementSearchComponent } from './achievement/achievement-search/achievement-search.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ClubSearchComponent,
    PlayerComponent,
    PlayerSearchComponent,
    AchievementComponent,
    AchievementSearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClubSearchModule,
    PlayerSearchModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
