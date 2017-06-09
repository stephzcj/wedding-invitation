import { Component,AfterViewInit } from '@angular/core';
declare var AMap:any;
@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements AfterViewInit{
  constructor(){   
  }
  ngAfterViewInit():void{
      var map = new AMap.Map('container', {//构造地图对象
        resizeEnable: true,
        zoom:16,
        center: [119.684573,29.798064]        
      });
      map.plugin(["AMap.ToolBar"], function() {//异步加载地图
        map.addControl(new AMap.ToolBar());
      });
      var polygonArr = new Array();//用多边形覆盖励骏酒店
      polygonArr.push([119.682131,29.797459]);
      polygonArr.push([119.68404,29.799284]);
      polygonArr.push([119.68507,29.798111]);
      polygonArr.push([119.683729,29.79718]);
      polygonArr.push([119.682849,29.796826]);
      var  polygon = new AMap.Polygon({
        path: polygonArr,//设置多边形边界路径
        strokeColor: "#FF33FF", //线颜色
        strokeOpacity: 0.2, //线透明度
        strokeWeight: 3,    //线宽
        fillColor: "#1791fc", //填充色
        fillOpacity: 0.35//填充透明度
      }); 
      // var marker = new AMap.Marker({ //添加自定义点标记
      //     map: map,
      //     position: [119.684573,29.798064], //基点位置
      //     offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
      //     draggable: true,  //是否可拖动
      // });
      polygon.setMap(map);
      var title='';
      var content=[];
      content.push("<img src='../../assets/images/lijun1.png'>我们在富春江励俊酒店期待你的到来<br/>地址：浙江省杭州市桐庐县城迎春南路683号");
      var infoWindow = new AMap.InfoWindow({
        content: content.join("<br/>"),
      });
      infoWindow.open(map, [119.684573,29.798064]);
  }
}
