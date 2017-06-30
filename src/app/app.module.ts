import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { ExhibitionComponent }   from './exhibition/exhibition.component';
import { InvitationComponent }   from './invitation/invitation.component';
import { MessageBoardComponent } from './messageboard/messageboard.component';
import { NavigationComponent }   from './navigation/navigation.component';
import { HomeComponent}          from './home/home.component';
import { ConnectService } from './dataservice/connect.service';
import { MsgHandleService } from './messageboard/msgb.datahandle.service';

@NgModule({
  declarations: [
    AppComponent,
    ExhibitionComponent,
    InvitationComponent,
    MessageBoardComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    ConnectService,
    MsgHandleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
