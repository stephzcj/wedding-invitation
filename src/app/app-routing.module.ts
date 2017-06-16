import { NgModule }             from '@angular/core';
import { RouterModule, Routes}  from '@angular/router';
import { ExhibitionComponent}   from './exhibition/exhibition.component';
import { InvitationComponent}   from './invitation/invitation.component';
import { MessageBoardComponent} from './messageboard/messageboard.component';
import { NavigationComponent}   from './navigation/navigation.component';
import { AppComponent}          from './app.component';
import { HomeComponent}         from './home/home.component';
const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  { path:'home',component:HomeComponent},
  { path: 'exhibition', component: ExhibitionComponent },
  { path: 'msgboard', component: MessageBoardComponent },
  { path: 'invitation', component: InvitationComponent },
  { path: 'navigation', component: NavigationComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}