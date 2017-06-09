import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { ExhibitionComponent}   from './exhibition/exhibition.component';
import { InvitationComponent}   from './invitation/invitation.component';
import { MessageBoardComponent} from './messageboard/messageboard.component';
import { NavigationComponent}   from './navigation/navigation.component'
@NgModule({
  declarations: [
    AppComponent,
    ExhibitionComponent,
    InvitationComponent,
    MessageBoardComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
