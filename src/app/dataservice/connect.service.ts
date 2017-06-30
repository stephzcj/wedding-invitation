import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConnectService{
    publicUrl:string="http://106.14.138.22:8080";
    constructor(private http:Http){}
    /**
     * 用http的get方法访问weddingivitation的后台服务器
     */
    getInfoFromBackend(extraurl:string):Observable<any>{
        let url=this.publicUrl+extraurl;
        return this.http.get(url).catch(this.handleError);
    }
    /**
     * 用http的post方法访问weddingivitation的后台服务器,
     * options有：
     * search?: {[key: string]: any | any[];};
     * params?: {[key: string]: ansy | any[];};
     * headers?: Headers;
     * body?: any;
     * withCredentials?: boolean;
     * responseType?: ResponseContentType;
     */
     postInfoFromBackend(extraurl:string,options?:any):Observable<any>{
         let url=this.publicUrl+extraurl;
         return this.http.post(url,"",options).catch(this.handleError); 
     }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          console.log("if:"+errMsg);
        } else {
          errMsg = error.message ? error.message : error.toString();
          console.log("else:"+errMsg);
        }      
        return Observable.throw(errMsg);
    }




}