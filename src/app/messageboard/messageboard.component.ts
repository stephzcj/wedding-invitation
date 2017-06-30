import { Component ,ViewChild,ElementRef,AfterViewInit,OnInit} from '@angular/core';
import {bless} from './bless';
import { MsgHandleService } from './msgb.datahandle.service';
declare var $: any;
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
  inputname:string;
  inputpp:string;
  canvasHeight:number;//画布高
  canvasWidth:number;//画布宽
  canvasContext:CanvasRenderingContext2D;//canvas对象
  lineNumber:number;//弹幕行数
  blessWidth:number;//弹幕在x方向上的坐标
  blessList:bless[];//新方法写的弹幕列表
  speed:number;//弹幕速率，越大越快，可以为小数
  blessX_px:number;//弹幕行内的间隙
  blessY_px:number;//弹幕行间的间隙
  blessFontSize:number;//弹幕字体大小
  blessYavailable:number[];//可用行的行号数组

  constructor(private msgHandleService:MsgHandleService){}

  ngOnInit(){
      this.inputname= "";
      this.inputpp= "";
      this.canvasHeight= this.blessArea.nativeElement.offsetHeight;//把canvas大小设置成与父元素一致
      this.canvasWidth= this.blessArea.nativeElement.offsetWidth;  //该设定必须在绘图之前完成，因此放在init中
      this.speed=0.5;
      this.blessY_px=8;
      this.blessX_px=10;
      this.blessFontSize=22;
      this.lineNumber=Math.floor(this.canvasHeight/(this.blessY_px+this.blessFontSize));
  }
  ngAfterViewInit():void{
      this.canvasContext=this.blessCtl.nativeElement.getContext('2d');//获取canvas对象
      this.canvasContext.fillStyle = "white";
      this.canvasContext.strokeStyle="black";
      this.canvasContext.lineJoin="round";
      this.canvasContext.font = this.blessFontSize+"px NSimSun,STFangsong";
      this.blessWidth=this.canvasWidth;
      this.blessYavailable=[];
      this.initData();
      this.blessDraw();
      $('#danmu,#feedback').on('show.bs.modal', function(){
          $('#btnGroup').hide();
      })
      $('#danmu,#feedback').on('hidden.bs.modal', function(){
          $('#btnGroup').show();
      })   
  }
  /**
   * 用对象的方式来完成弹幕动画，比原方法灵活
   * 存在的bug：当弹幕以一种节奏消失，而新增的数据在某种节奏下增加，新增的弹幕会重叠
   * 考虑用一个屏幕空间资源列表来解决，每当那行消失一个弹幕，就给池中增加一个可选行，数据结构用队列
   * 但是这样又出现问题了，一波弹幕后长时间无弹幕，新打的弹幕还是可能在下方出现
   */
  blessDraw():void{
      this.canvasContext.clearRect(0,0,this.canvasWidth,this.canvasHeight);
      this.canvasContext.save();
      for (var index = 0; index < this.blessList.length; index++) {
        //行与行之间的间隙偏移数
        let offsetNum=index%this.lineNumber+1;
        let nowBless:bless=this.blessList[index];
        if(!nowBless.getIsNew() && index>=this.lineNumber ){//老数据（打开留言板之前的数据）规整规划区域
          let beforeBless:bless=this.blessList[index-this.lineNumber];
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
          this.blessYavailable.push(this.blessList[index].getBless2TopPx()/(this.blessY_px+this.blessFontSize)); 
          this.blessList.splice(index,1);//弹幕走出屏幕后直接从数组中删除
        }
    }
      this.canvasContext.restore();
      window.requestAnimationFrame(()=>this.blessDraw());
  }
  /**
   * 访问数据库，取出已有的弹幕
   */
  initData():void{
      this.blessList=[];
      this.msgHandleService.getAllDanmu().subscribe(data=>{
        for(let index=0;index<data.length;index++){
          let blessOb:bless=new bless();
          blessOb.setBlessText(data[index].context,this.canvasContext);
          blessOb.setBless2LeftPx(this.canvasWidth+50*Math.random());//初始化距离最左边距离
          blessOb.setBless2Before(50*Math.random());//初始化弹幕间隙
          this.blessList.push(blessOb);   
        }
      })  
  } 
  /**
   * 点击留言按钮，添加弹幕数据
   */
  addData():void{
      let gname:string=this.guestName.nativeElement.value;
      let gnumber:string=this.guestNum.nativeElement.value;
      if(null==gname || ""==gname || undefined==gname){
        this.inputname="1px solid red";
        this.guestName.nativeElement.placeholder="姓名不能为空";
        return;
      }
      if(null==gnumber || ""==gnumber|| undefined==gnumber){
        this.inputpp="1px solid red";
        this.guestNum.nativeElement.placeholder="出席人数不能为空";
        return;
      }
      $("#feedback").modal("hide");
      this.guestName.nativeElement.value="";
      this.guestNum.nativeElement.value="";
      this.blessList.push(this.getBlessObject(gname,gnumber,"")); 
      this.msgHandleService.addSingin(gname,gnumber);
  }
  /**
   * 点击弹幕发送按钮，添加弹幕数据
   */
  addDanmu():void{
      let gbless:string=this.guestBless.nativeElement.value;
      if(null==gbless || ""==gbless|| undefined==gbless){
        return;
      }
      if(null!=gbless && ""!=gbless && undefined!=gbless){
        this.guestBless.nativeElement.value="";
        this.blessList.push(this.getBlessObject("","",gbless));
        this.msgHandleService.addDanmu(gbless);
      }
  }
  /**
   * 设置对象
   */
  getBlessObject(gname:string,gnumber:string,gbless:string):bless{
      let blessOb:bless=new bless();
      blessOb.setBless2LeftPx(this.canvasWidth+15*Math.random());
      blessOb.setBless2Before(5+25*Math.random());
      blessOb.setIsNew(true);
    if(null!=gbless && ""!=gbless && undefined!=gbless){
      blessOb.setBlessText(gbless,this.canvasContext);
      return blessOb;
    }else if(null==gbless || ""==gbless || undefined==gbless){
      blessOb.setBlessText(gname+"  "+gnumber+"人出席",this.canvasContext);
      return blessOb;
    }
  }
  /**
   * 验证数据
   */
  verify():void{
      let gname:string=this.guestName.nativeElement.value;
      let gnumber:string=this.guestNum.nativeElement.value;
      if(null!=gname && ""!=gname && undefined!=gname){
        this.inputname="";
        this.guestName.nativeElement.placeholder="输入你的名字";
      }else{
        this.inputname="1px solid red";
        this.guestName.nativeElement.placeholder="姓名不能为空";
      }
      if(null!=gnumber && ""!=gnumber && undefined!=gnumber){
        this.inputpp="";
        this.guestNum.nativeElement.placeholder="输入出席人数";
      }else{
        this.inputpp="1px solid red";
        this.guestNum.nativeElement.placeholder="人数不能为空";
      }
  }

}
