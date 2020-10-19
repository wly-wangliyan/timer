/**
 * Created by zack on 26/1/18.
 */

/**
 * 屏幕操作
 * Need to declare var ActiveXObject: any in typings.d.ts
 */
export class ScreenHelper {

  public static Instance: ScreenHelper = new ScreenHelper();

  private constructor() {
  }

  /**
   * 进入全屏
   * @param element 在全屏中显示的元素
   */
  public requestFullScreen(element: any) {
    // 判断各种浏览器，找到正确的方法
    const requestMethod = element.requestFullScreen || // W3C
      element.webkitRequestFullScreen ||    // Chrome等
      element.mozRequestFullScreen || // FireFox
      element.msRequestFullScreen; // IE11
    if (requestMethod) {
      requestMethod.call(element);
    } else if (ActiveXObject) {// for Internet Explorer
      const wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  }

  /**
   * 退出全屏 判断浏览器种类
   */
  public exitFullScreen() {
    // 判断各种浏览器，找到正确的方法
    const element: any = document;
    const exitMethod = element.exitFullscreen || // W3C
      element.mozCancelFullScreen ||    // Chrome等
      element.webkitExitFullscreen || // FireFox
      element.webkitExitFullscreen; // IE11
    if (exitMethod) {
      exitMethod.call(document);
    } else if (ActiveXObject) { // for Internet Explorer
      const wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  }
}
