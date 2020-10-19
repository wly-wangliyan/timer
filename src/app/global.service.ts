import {Injectable} from '@angular/core';
import {HeroesComponent} from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public static Instance: GlobalService;
  public a = 1;

  public heroBox: HeroesComponent;

  constructor() {
  }
}


