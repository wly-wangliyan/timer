import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteMonitorService implements CanActivate {

  private path: string;
  public routePathChanged: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.path = state.url;
    console.log(this.path);
    this.routePathChanged.emit(state.url);
    return true;
  }
}
