import { Component ,Input,trigger,state,style,animate,transition,keyframes} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyIn', [
      transition('void => *', [   
        animate('0.5s ease-out', keyframes([ // 回弹的效果
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ])
   ]
})
export class AppComponent {
  
}
