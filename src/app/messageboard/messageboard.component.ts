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
  blessYavailable:number[];//可用行的行号数组
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
      this.blessYavailable=[];
      this.initDataNew();
      this.blessDrawNew();
  }
  /**
   * 用对象的方式来完成弹幕动画，比原方法灵活
   * 存在的bug：当弹幕以一种节奏消失，而新增的数据在某种节奏下增加，新增的弹幕会重叠
   * 考虑用一个屏幕空间资源列表来解决，每当那行消失一个弹幕，就给池中增加一个可选行，数据结构用队列
   * 但是这样又出现问题了，一波弹幕后长时间无弹幕，新打的弹幕还是可能在下方出现
   */
  blessDrawNew():void{
      this.canvasContext.clearRect(0,0,this.canvasWidth,this.canvasHeight);
      this.canvasContext.save();
      for (var index = 0; index < this.blessListNew.length; index++) {
        //行与行之间的间隙偏移数
        let offsetNum=index%this.lineNumber+1;
        let nowBless:bless=this.blessListNew[index];
        if(!nowBless.getIsNew() && index>=this.lineNumber ){//老数据（打开留言板之前的数据）规整规划区域
          let beforeBless:bless=this.blessListNew[index-this.lineNumber];
          let indexOffset=beforeBless.getBless2LeftPx()+beforeBless.getBlessTextLength()+beforeBless.getBless2Before();
          nowBless.setBless2LeftPx(indexOffset);
        }
        if(nowBless.getIsNew() && null==nowBless.getBless2TopPx()){//给新数据分配X,Y坐标
          nowBless.setBless2LeftPx(this.canvasWidth);//X坐标：一律从最右侧出现
          if(0==this.blessYavailable.length){//Y坐标：如果可分配行队列没有值，则按老数据方式规整使用
            nowBless.setBless2TopPx(offsetNum*(this.blessY_px+this.blessFontSize));
          }else{//如果可分配行队列有值，则分配到行
            nowBless.setBless2TopPx(this.blessYavailable.shift()*(this.blessY_px+this.blessFontSize));
          }
        }
        if(!nowBless.getIsNew() && null==nowBless.getBless2TopPx()){//给老数据分配Y坐标
          nowBless.setBless2TopPx(offsetNum*(this.blessY_px+this.blessFontSize));
        }
        this.canvasContext.fillText(nowBless.getBlessText(),nowBless.getBless2LeftPx(),nowBless.getBless2TopPx());
        nowBless.setBless2LeftPx(nowBless.getBless2LeftPx()-this.speed);
        if(nowBless.getBless2LeftPx()+nowBless.getBlessTextLength()<0){
          this.blessYavailable.push(this.blessListNew[index].getBless2TopPx()/(this.blessY_px+this.blessFontSize)); 
          this.blessListNew.splice(index,1);//弹幕走出屏幕后直接从数组中删除
        }
    }
      this.canvasContext.restore();
      window.requestAnimationFrame(()=>this.blessDrawNew());
  }
  /**
   * 初始化老数据
   */
  initDataNew():void{
      this.blessListNew=[];
      for (var index = 0; index < 13; index++) {
        let blessOb:bless=new bless();
        blessOb.setBlessText(index+"已有弹幕",this.canvasContext);
        blessOb.setBless2LeftPx(this.canvasWidth+20*Math.random());
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
