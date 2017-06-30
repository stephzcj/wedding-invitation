import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/publishReplay';
import {Observable} from 'rxjs/Observable';
import {ConnectService} from '../dataservice/connect.service'

@Injectable()
export class MsgHandleService{
    constructor(private connectService:ConnectService){}
    /**
     *取所有弹幕
     */
    getAllDanmu():Observable<any>{
      return this.connectService.getInfoFromBackend("/getdanmu").map(res=>res.json()).publishReplay(1,1000).refCount().take(1);
    }
    /**
     *新增弹幕，无需返回数据，所以必须用subscribe()消费流
     */
    addDanmu(context:string):void{
      let params={"context":context};
      this.connectService.postInfoFromBackend("/adddanmu",{params:params}).subscribe();
    }
    /**
     *新增签到，无需返回数据，所以必须用subscribe()消费流
     */
    addSingin(name:string,pnum:string):void{
      let params={"name":name,"pnum":pnum};
      this.connectService.postInfoFromBackend("/recordguest",{params:params}).subscribe();
    }


}