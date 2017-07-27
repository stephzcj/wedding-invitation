import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
declare var wx:any;
declare var $:any;
if (environment.production) {
  enableProdMode();
}
function preLoadImg(url) { 
  var img = new Image(); 
  img.src = url; 
} 
function autoPlayAudio() {
        wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
           $("#mp3")[0].play();
        });
};
// 解决ios音乐不自动播放的问题
autoPlayAudio();
preLoadImg("assets/images/103-1.jpg");
preLoadImg("assets/images/os1.png");
platformBrowserDynamic().bootstrapModule(AppModule);



