/**
 * Created by zack on 5/5/17.
 */
export class CalculationHelper {

  private constructor() {
  }

  /**
   * 计算增幅百分比 最大值为999%  显示样式: +32.18%
   * @param left 后值
   * @param right 前值
   * @returns {IncreasePercentItem}
   */
  public static IncreasePercent(left: number, right: number): IncreasePercentItem {
    if (left === 0 || right === 0 || left === right) {
      return new IncreasePercentItem(false, '');
    }
    const tempValue = (left - right) / right;
    let value;

    if (tempValue >= 10 || tempValue <= -10) {
      value = '999%';
    } else {
      value = (tempValue * 100).toFixed(2).toString() + '%';
    }

    value = tempValue > 0 ? '+' + value : value;

    return new IncreasePercentItem(tempValue > 0, value);
  }

  /**
   * 计算占比百分比 显示式样:(30.02%)
   * @param args 多个数字
   * @returns {any[]} 返回与传入数据长度相同的百分比字符串
   */
  public static ProportionPercent(...args: number[]): Array<string> {

    let total = 0;
    const results = new Array(args.length).fill('');

    // 求和
    args.forEach(num => {
      total += num;
    });

    if (total === 0) {
      return results;
    }

    args.forEach((num, index) => {
      const value = parseFloat((num / total * 100).toFixed(2));
      if (value !== 0) {
        results[index] = '(' + value.toString() + '%)';
      }
    });

    return results;
  }

  /**
   * 计算占比百分比 显示式样:(30.02%)
   * @param value 传入值
   * @param total 总值
   * @returns {string} 占比字符串
   */
  public static SoloProportionPercent(value: number, total: number): string {
    if (value === 0 || total === 0) {
      return '';
    }

    const temp = parseFloat((value / total * 100).toFixed(2));

    if (temp !== 0) {
      return '(' + temp.toString() + '%)';
    }

    return '';
  }

  public static Add(a, b) {
    let c, d, e;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.Mul(a, e) + this.Mul(b, e)) / e;
  }

  public static Sub(a, b) {
    let c, d, e;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.Mul(a, e) - this.Mul(b, e)) / e;
  }

  public static Mul(a, b) {
    let c = 0;
    const d = a.toString(),
      e = b.toString();
    try {
      c += d.split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      c += e.split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
  }

  public static Div(a, b) {
    let c, d, e = 0,
      f = 0;
    try {
      e = a.toString().split('.')[1].length;
    } catch (g) {
      e = 0;
    }
    try {
      f = b.toString().split('.')[1].length;
    } catch (g) {
      f = 0;
    }
    return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), this.Mul(c / d, Math.pow(10, f - e));
  }

  /**
   * 根据经纬度计算两点之间的距离
   * @param lat1
   * @param lon1
   * @param lat2
   * @param lon2
   * @returns {number}
   */
  public static calculateSphericalDistance(lat1: any, lon1: any, lat2: any, lon2: any): number {
    const earthRadius = 6378137; // 地球半径，单位m
    let f = this.getRad((lat1 + lat2) / 2);
    let g = this.getRad((lat1 - lat2) / 2);
    let l = this.getRad((lon1 - lon2) / 2);
    let sg = Math.sin(g);
    let sl = Math.sin(l);
    let sf = Math.sin(f);
    let s, c, w, r, d, h1, h2;
    let fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;
    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * earthRadius;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;
    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  }

  private static getRad(num) {
    return num * (Math.PI) / 180.0;
  }

  /**
   * calculateRandom 产生任意长度随机字母数字组合
   * @param randomFlag 是否任意长度
   * @param min 任意长度最小位[固定位数]
   * @param max 任意长度最大位
   * @returns {string}
   */
  public static calculateRandom(randomFlag: boolean, min: number, max: number): string {
    const arr = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    let str = '', range = min;

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }
}

export class IncreasePercentItem {

  public isPlus: boolean;
  public value: string;

  /**
   * 构造函数
   * @param isPlus 是否是正数
   * @param value 显示值
   */
  constructor(isPlus: boolean = false, value: string = '') {
    this.isPlus = isPlus;
    this.value = value;
  }
}
