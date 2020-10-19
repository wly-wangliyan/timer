import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {HeroesComponent} from './heroes/heroes.component';
import {GlobalService} from './global.service';
import {RouteMonitorService} from './route-monitor.service';


// import {$} from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements AfterViewInit {

  public deltaLeft = 0;
  public deltaTop = 0;
  public move = false;


  @ViewChild(HeroesComponent) public globalHeroesBox: HeroesComponent;
  @ViewChild('pageDiv') public pageDiv: ElementRef;

  @ViewChild('clock_box') public clockBox: ElementRef;
  @ViewChild('clock_dial') public clockDial: ElementRef;
  @ViewChild('hour') public hour: ElementRef;
  @ViewChild('minute') public minute: ElementRef;
  @ViewChild('second') public second: ElementRef;
  @ViewChild('range') public range: ElementRef;
  @ViewChild('icon') public icon: ElementRef;


  constructor(private routeService: RouteMonitorService,
              public globalService: GlobalService,
              private renderer2: Renderer2) {

  }


  public ngAfterViewInit(): void {
    // console.log(this.range.nativeElement.style.height);
    this.globalService.heroBox = this.globalHeroesBox;
    GlobalService.Instance = this.globalService;
    console.log(GlobalService.Instance);

    this.routeService.routePathChanged.subscribe(() => {
      // 到路由变更时重置显示状态
      console.log('biangeng');
    });
    console.log(localStorage.user_service_info);

    const dials: any = document.getElementsByClassName('dial');
    console.log(dials[0]);

    for (let i = 0; i < dials.length; i++) {
      const angle = 360 / 12 * i;
      dials[i].style.transform = 'rotate(' + angle + 'deg)';
      dials[i].lastChild.style.transform = 'rotate(' + -angle + 'deg)';

    }
    const timer = setInterval(() => {
      this.clockMove();
    }, 1000);

    // const main = document.getElementById('range');

  }

  public changeColor(): void {

    this.globalHeroesBox.httpFlag = false;
    // this.globalService.heroBox.colorChange();
  }

  public clockMove(): void {
    const nowTime = new Date();
    const H = nowTime.getHours();
    const M = nowTime.getMinutes();
    const S = nowTime.getSeconds();
    // 1s是6度，1m是6度，1h是30度；
    this.second.nativeElement.style.transform = 'rotate(' + S * 6 + 'deg)';
    this.hour.nativeElement.style.transform = 'rotate(' + (H * 30 + 30 / 60 * M) + 'deg)';
    this.minute.nativeElement.style.transform = 'rotate(' + M * 6 + 'deg)';
  }

  public displayStateChanged(e): void {
    console.log(e.displayState);
    if (this.globalHeroesBox.httpFlag) {
      this.renderer2.setStyle(this.pageDiv.nativeElement, 'display', 'block');
    } else {
      this.renderer2.setStyle(this.pageDiv.nativeElement, 'display', 'none');
    }
  }


  public mousedownEvent(e): void {
    const icon = document.querySelector('.icon');
    const aOffsetLeft = this.offset(icon, 'left');
    const aOffsetRight = this.offset(icon, 'top');
    console.log(aOffsetLeft);
    this.deltaLeft = e.clientX - aOffsetLeft;
    // this.deltaLeft = e.clientX - e.target.offsetLeft;
    console.log('横坐标：' + e.clientX);
    console.log('偏移量：' + aOffsetLeft);
    console.log('横坐标减偏移量：' + this.deltaLeft);
    this.deltaTop = e.clientY - aOffsetRight;
    // this.deltaTop = e.clientY - e.target.offsetTop;
    console.log('纵坐标：' + e.clientY);
    console.log('偏移量：' + aOffsetRight);
    console.log('纵坐标减偏移量：' + this.deltaTop);
    this.move = true;
  }

  public mouseupEvent(e): void {
    this.move = false;
    console.log('mouseup');
  }

  public mousemoveEvent(e): void {
    const icon = document.querySelector('.icon');
    if (this.move) {
      const cx = e.clientX;
      const cy = e.clientY;
      /** 相减即可得到相对于父元素移动的位置 */
      const dx = cx - this.deltaLeft;
      console.log(e.clientX);
      const dy = cy - this.deltaTop;
      console.log(e.clientY);

      /** 防止超出父元素范围 */
      // if (dx < 0) {
      //   dx = 0;
      // }
      // if (dy < 0) {
      //   dy = 0;
      // }
      // if (dx > 700) {
      //   dx = 700;
      // }
      // if (dy > 700) {
      //   dy = 700;
      // }
      icon.setAttribute('style', `left:${dx}px;top:${dy}px`);
    }

  }


  private offset(obj, direction): any {
    // 将top,left首字母大写,并拼接成offsetTop,offsetLeft
    const offsetDir = 'offset' + direction[0].toUpperCase() + direction.substring(1);

    let realNum = obj[offsetDir];
    let positionParent = obj.offsetParent;  // 获取上一级定位元素对象

    while (positionParent != null) {
      realNum += positionParent[offsetDir];
      positionParent = positionParent.offsetParent;
    }
    return realNum;


  }
}
