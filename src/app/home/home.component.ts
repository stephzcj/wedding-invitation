import { Component,OnInit,ElementRef ,ViewChild,AfterViewInit} from '@angular/core';
import {AppComponent} from '../app.component'
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit{
  @ViewChild("showarea") showarea:ElementRef;//用于获取home页DOM
  @ViewChild("showCtl") showctl:ElementRef;//canvas对象
  showWidth:number;//画布宽
  showHeight:number;//画布高
  canvasContext:CanvasRenderingContext2D;//canvas对象
  ngOnInit():void{
    this.showHeight= this.showarea.nativeElement.offsetHeight;//把canvas大小设置成与父元素一致
    this.showWidth= this.showarea.nativeElement.offsetWidth;  //该设定必须在绘图之前完成，因此放在init中
  }
  ngAfterViewInit():void{
    this.canvasContext=this.showctl.nativeElement.getContext('2d');//获取canvas对象
  }


}
