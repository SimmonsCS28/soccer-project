import { PlayerSearchComponent } from './player/player-search/player-search.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ClubSearchComponent } from './club/club-search/club-search.component';
import { AchievementSearchComponent } from './achievement/achievement-search/achievement-search.component';
import { MiscSearchComponent } from './misc-search/misc-search.component';
import { ClubComponent } from './club/club.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'clubsearch', component: ClubSearchComponent},
    { path: 'playersearch', component: PlayerSearchComponent},
    { path: 'achievementsearch', component: AchievementSearchComponent},
    { path: 'miscellaneoussearch', component: MiscSearchComponent},
    { path: 'clubdetails', component: ClubComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}