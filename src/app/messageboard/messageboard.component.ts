import { Component ,ViewChild,ElementRef,AfterViewInit,OnInit} from '@angular/core';
import {bless} from './bless'
@Component({
  selector: 'messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageBoardComponent implements AfterViewInit,OnInit{
  @ViewChild("blessCtl") blessCtl:ElementRef;
  @ViewChild("blessArea") blessArea:ElementRef;
  @ViewChild("guestName") guestName:ElementRef;
  @ViewChild("guestNum") guestNum:ElementRef;
  @ViewChild("guestBless") guestBless:ElementRef;
  canvasHeight:number;//画布高
  canvasWidth:number;//画布宽
  canvasContext:CanvasRenderingContext2D;//canvas对象
  lineNumber:number;//弹幕行数
  blessWidth:number;//弹幕在x方向上的坐标
  blessList:string[];//弹幕列表
  blessListNew:bless[];//新方法写的弹幕列表
  speed:number;//弹幕速率，越大越快，可以为小数
  blessX_px:number;//弹幕行内的间隙
  blessY_px:number;//弹幕行间的间隙
  blessFontSize:number;//弹幕字体大小
  ngOnInit(){
      this.canvasHeight= this.blessArea.nativeElement.offsetHeight;//把canvas大小设置成与父元素一致
      this.canvasWidth= this.blessArea.nativeElement.offsetWidth;  //该设定必须在绘图之前完成，因此放在init中
      this.speed=1;
      this.blessY_px=5;
      this.blessX_px=10;
      this.blessFontSize=20;
      this.lineNumber=Math.floor(this.canvasHeight/(this.blessY_px+this.blessFontSize));
  }
  ngAfterViewInit():void{
      this.canvasContext=this.blessCtl.nativeElement.getContext('2d');//获取canvas对象
      this.canvasContext.fillStyle = "white";
      this.canvasContext.strokeStyle="white";
      this.canvasContext.lineJoin="round";
      this.canvasContext.font = this.blessFontSize+"px NSimSun,STFangsong";
      this.blessWidth=this.canvasWidth;
      this.initDataNew();
      this.blessDrawNew();
  }
  /**
   * 用对象的方式来完成弹幕动画，比原方法灵活
   * 存在的bug：当弹幕以一种节奏，而新增的数据在某种节奏下增加，会导致重叠
   * 考虑用一个屏幕空间资源列表来解决，每当那行消失一个弹幕，就给池中增加一个可选行。
   */
  blessDrawNew():void{
      this.canvasContext.clearRect(0,0,this.canvasWidth,this.canvasHeight);
      this.canvasContext.save();
      for (var index = 0; index < this.blessListNew.length; index++) {
        //行与行之间的间隙偏移数
        let offsetNum=index%this.lineNumber+1;
        let nowBless:bless=this.blessListNew[index];
        if(index>=this.lineNumber && !nowBless.getIsNew()){//老数据规整规划区域
          let beforeBless:bless=this.blessListNew[index-this.lineNumber];
          let indexOffset=beforeBless.getBless2LeftPx()+beforeBless.getBlessTextLength()+beforeBless.getBless2Before();
          nowBless.setBless2LeftPx(indexOffset);
        }
        if(nowBless.getIsNew() && null==nowBless.getBless2TopPx()){//未设置Y坐标的新数据一律从最右边出现
          nowBless.setBless2LeftPx(this.canvasWidth);
        }
        if(null==nowBless.getBless2TopPx()){
          nowBless.setBless2TopPx(offsetNum*(this.blessY_px+this.blessFontSize));
        }
        this.canvasContext.fillText(nowBless.getBlessText(),nowBless.getBless2LeftPx(),nowBless.getBless2TopPx());
        nowBless.setBless2LeftPx(nowBless.getBless2LeftPx()-this.speed);
        if(nowBless.getBless2LeftPx()+nowBless.getBlessTextLength()<0){
            this.blessListNew.splice(index,1);
        }
    }
      this.canvasContext.restore();
      window.requestAnimationFrame(()=>this.blessDrawNew());
  }
  /**
   * 新的初始化，需要MOCK对象
   */
  initDataNew():void{
      this.blessListNew=[];
      for (var index = 0; index < 13; index++) {
        let blessOb:bless=new bless();
        blessOb.setBlessText(index+"已有弹幕",this.canvasContext);
        blessOb.setBless2LeftPx(this.canvasWidth+15*Math.random());
        blessOb.setBless2Before(5+15*Math.random());//5~20px
        this.blessListNew.push(blessOb);     
      }  
      
  } 
  /**
   * 点击留言按钮，添加弹幕数据
   * TODO:先使用mock，后期添加到数据库
   */
  addData():void{
      let gname:string=this.guestName.nativeElement.value;
      let gnumber:number=this.guestNum.nativeElement.value;
      let gbless:string=this.guestBless.nativeElement.value;
      let blessOb:bless=new bless();
      blessOb.setBlessText(gname+":"+gbless,this.canvasContext);
      blessOb.setBless2LeftPx(this.canvasWidth+15*Math.random());
      blessOb.setBless2Before(5+15*Math.random());//5~20px
      blessOb.setIsNew(true);
      this.blessListNew.push(blessOb);  
  }

}
