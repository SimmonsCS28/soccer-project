import { AchievementService } from './achievement/achievement-search/achievement.service';

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
import { HttpClientModule } from '@angular/common/http'
import { XHRBackend, HttpModule } from '@angular/http'
import { PlayerSearchService } from './player/player-search/player-search-service';
import { ClubSearchService } from './club/club-search/club-search.service';
import { AchievementSearchModule } from './achievement/achievement-search/achievement-search.module';
import { MiscSearchComponent } from './misc-search/misc-search.component';
import { MiscSearchModule } from './misc-search/misc-search.module';
import { MiscSearchService } from './misc-search/misc-search.service';
import { ClubComponent } from './club/club.component';
import { ClubModule } from './club/club.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ClubComponent,
    ClubSearchComponent,
    PlayerComponent,
    PlayerSearchComponent,
    AchievementComponent,
    AchievementSearchComponent,
    MiscSearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClubModule,
    ClubSearchModule,
    PlayerSearchModule,
    AchievementSearchModule,
    MiscSearchModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    DBService,
    PlayerSearchService,
    ClubSearchService,
    AchievementService,
    MiscSearchService,
    XHRBackend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
