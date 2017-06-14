export class bless{
    private blessText:string;//弹幕内容
    private blessTextLength:number;//弹幕本身长度
    private bless2LeftPx:number;//弹幕X方向的坐标
    private bless2Before:number;//弹幕距离上一个弹幕距离的随机量
    private bless2TopPx:number;//弹幕Y方向的坐标
    private isNew:boolean;//标记弹幕是否为此刻之后新增的，只做标记显示用，不入数据库
    public setBlessText(text:string,canvasContext:CanvasRenderingContext2D):void{
        this.blessText=text;
        this.blessTextLength=canvasContext.measureText(text).width;
    }
    public setBless2LeftPx(X_dis:number):void{
        this.bless2LeftPx=X_dis;
    }
    public getBlessText():string{
        return this.blessText;
    }
    public getBlessTextLength():number{
        return this.blessTextLength;
    }
    public setBless2TopPx(Y_dis:number):void{
        this.bless2TopPx=Y_dis;
    }
    public setIsNew(isNew:boolean):void{
        this.isNew=isNew;
    }
    public getIsNew():boolean{
        return this.isNew;
    }
     /**
     * 返回弹幕Y方向坐标
     */
    public getBless2TopPx():number{
        return this.bless2TopPx;
    }
    /**
     * 返回弹幕X方向坐标
     */
    public getBless2LeftPx():number{
        return this.bless2LeftPx;
    }
    /**
     * 设置弹幕距离它左边弹幕的间隙
     */
    public setBless2Before(rand:number):void{
        this.bless2Before=rand;
    }
    /**
     * 返回弹幕距离它左边弹幕的间隙
     */
    public getBless2Before():number{
        return this.bless2Before;
    }
}