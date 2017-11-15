import { PlayerSearchComponent } from './player/player-search/player-search.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ClubSearchComponent } from './club/club-search/club-search.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'clubsearch', component: ClubSearchComponent},
    { path: 'playersearch', component: PlayerSearchComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}