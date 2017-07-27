import { Component ,AfterViewInit,Input,trigger,style,animate,transition,keyframes,OnInit,ViewChild,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
declare var $:any;
declare var wx:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyIn', [
      transition(':enter', [   
        animate('0.5s ease-in-out', keyframes([ // 回弹的效果
          style({opacity: 0, transform: 'translateY(-30%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition(':leave', [   
        animate('0.5s ease-out', keyframes([ // 回弹的效果
          style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateY(15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(-30%)',  offset: 1.0})
        ]))
      ])
    ])
   ]
})
export class AppComponent implements OnInit,AfterViewInit{
  @ViewChild("musicontrol") musicontrol:ElementRef;
  openlist:boolean;
  show:boolean;
  music:boolean;
  currentPage:string;
  WeixinJSBridge:any;
  constructor(private router: Router){
    this.openlist=false;
    this.music=true;
  }
  ngOnInit():void{
  }
  ngAfterViewInit():void{
    $("#mp3")[0].play();


      

  }

  showLists():void{
    this.openlist=!this.openlist;
  }

  direct2(destiny:string):void{
    this.currentPage=destiny;
    this.router.navigate([destiny]);
  }
  musicplay(mscctl:boolean):void{
    if(mscctl){
      $("#mp3")[0].pause();
    }else{
      $("#mp3")[0].play();
    }
    this.music=!this.music;
  }

  
}
