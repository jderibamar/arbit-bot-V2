import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { MDBBootstrapModule, CarouselModule, WavesModule } from 'angular-bootstrap-md'
import { Crex24Service } from './servicos/crex24.service'
import { BittrexService } from './servicos/bittrex.service'
import { ExmoService } from './servicos/exmo.service'
import { MexcService } from './servicos/mexc.service'
import { Funcoes } from './servicos/funcoes.service'
// import { SlideshowModule } from 'ng-simple-slideshow';

import { AppComponent } from './app.component'
import { BinanceComponent } from './binance/binance'

@NgModule({
  declarations: [
    AppComponent,
    BinanceComponent
  ],
  imports: [BrowserModule, MDBBootstrapModule, CarouselModule, WavesModule ],
  providers: [Crex24Service, BittrexService, ExmoService, MexcService, Funcoes],
  bootstrap: [AppComponent]
})
export class AppModule { }
