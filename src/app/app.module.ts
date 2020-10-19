import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DemoComponent } from './demo/demo.component';
import { BootComponent } from './boot/boot.component';
import { PopupComponent } from './popup/popup.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [AppComponent, HeroesComponent, DemoComponent, BootComponent, PopupComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
