import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements AfterViewInit {

  public deltaLeft = 0;
  public deltaTop = 0;
  public move = false;


  constructor(private renderer2: Renderer2) {
  }

  public get httpFlag(): boolean {
    return this.noPermissionFlag;
  }

  @Input()
  public set httpFlag(flag: boolean) {
    this.renderer2.setStyle(this.pageDiv.nativeElement, 'color', flag ? 'black' : 'red');
    this.noPermissionFlag = flag;
    this.displayStateChanged.emit({displayState: flag});
  }

  @ViewChild('color') color: any;
  @ViewChild('pageDiv') public pageDiv: ElementRef;
  private noPermissionFlag = false;


  // tslint:disable-next-line:no-output-rename
  @Output('displayStateChanged') public displayStateChanged = new EventEmitter();

  public ngAfterViewInit(): void {
    const main = document.getElementById('range');
    const icon = document.querySelector('.icon');

// 移动触发事件要放在，区域控制元素上
    main.addEventListener('mousemove', (e) => {
      if (this.move) {
        const cx = e.clientX;
        const cy = e.clientY;
        /** 相减即可得到相对于父元素移动的位置 */
        let dx = cx - this.deltaLeft;
        let dy = cy - this.deltaTop;

        /** 防止超出父元素范围 */
        if (dx < 0) {
          dx = 0;
        }
        if (dy < 0) {
          dy = 0;
        }
        if (dx > 500) {
          dx = 500;
        }
        if (dy > 300) {
          dy = 300;
        }
        icon.setAttribute('style', `left:${dx}px;top:${dy}px`);
      }
    });

// 拖动结束触发要放在，区域控制元素上
    main.addEventListener('mouseup', (e) => {
      this.move = false;
      console.log('mouseup');
    });
  }

  public colorChange(): void {
    console.log('123');
    this.color.nativeElement.style.color = 'red';
  }

  public mousedownEvent(e): void {
    this.deltaLeft = e.clientX - e.target.offsetLeft;
    this.deltaTop = e.clientY - e.target.offsetTop;
    this.move = true;
  }


}
