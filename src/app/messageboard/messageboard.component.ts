import { Component ,ViewChild,ElementRef,AfterViewInit,OnInit} from '@angular/core';

@Component({
  selector: 'messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageBoardComponent implements AfterViewInit,OnInit{
  @ViewChild("blessCtl") blessCtl:ElementRef;
  @ViewChild("blessArea") blessArea:ElementRef;
  canvasHeight:number;
  canvasWidth:number;
  public canvasContext:CanvasRenderingContext2D;
  blessWidth:number;
  ngOnInit(){
      this.canvasHeight= this.blessArea.nativeElement.offsetHeight;//把canvas大小设置成与父元素一致
      this.canvasWidth= this.blessArea.nativeElement.offsetWidth;  //该设定必须在绘图之前完成，因此放在init中
  }
  ngAfterViewInit():void{
      this.canvasContext=this.blessCtl.nativeElement.getContext('2d');//获取canvas对象
      this.canvasContext.fillStyle = "white";
      this.canvasContext.strokeStyle="white";
      this.canvasContext.lineJoin="round";
      this.canvasContext.font = "18px 幼圆";
      this.blessWidth=this.canvasWidth;
      this.blessDraw();
  }
  blessDraw():void{
      this.canvasContext.clearRect(0,0,this.canvasWidth,this.canvasHeight);
      this.canvasContext.save();
      this.canvasContext.fillText("Hello world", this.blessWidth, 20);
      this.blessWidth=this.blessWidth-1;//requestAnimationFrame函数1s调用60次，所以这里可以控制弹幕速度
      this.canvasContext.restore();
      let blessLenth=this.canvasContext.measureText("Hello world");
      if(this.blessWidth+blessLenth.width<0){
        this.blessWidth=this.canvasWidth;
        window.requestAnimationFrame(()=>this.blessDraw());
      }else{
        window.requestAnimationFrame(()=>this.blessDraw());
      }
      
  
  }

}
