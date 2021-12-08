import { Injectable } from '@angular/core'
import { Funcoes } from './funcoes.service'

const perc = 3
@Injectable()
export class Crex24Service
{
    constructor(private funcS: Funcoes){}

    async crex24Exmo()
    {
      let moComuns = [],
          exCp = 'EXMO', 
          exVd = 'Crex24', 
          exCp2 = 'Crex24', 
          exVd2 = 'EXMO',

          apiEx2 = 'https://api.exmo.com/v1.1/ticker',
          ex2Data = await fetch(apiEx2),
          ex2Dados = await ex2Data.json(),
          moC = [],
          moEx2 = [],
          arrImprimir = [],
          moExcluir = ['ONEBTC']        
  
          moC = await this.apiCrex()
          // console.log('Dados da Exmo: ', ex2Dados)
  
      const keys = Object.keys(ex2Dados)
      const values: any = Object.values(ex2Dados)
  
      for(let i in keys)
      {
          if(values[i].buy_price > 0 && values[i].sell_price > 0)
              moEx2.push({ symbol: keys[i], buy: values[i].buy_price, sell: values[i].sell_price })
      }
  
      for(let i in moEx2)
      {
          moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
          moEx2[i].symbol = moEx2[i].symbol.toUpperCase()
      }

      for(let i in moC)
        {
            for(let j in moEx2)
            {
                if(moC[i].instrument === moEx2[j].symbol)
                    moComuns
                    .push(
                        { 
                            symbol: moC[i].instrument, pdCpEx1: moC[i].bid, pdVdEx1: moC[i].ask,
                            pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                        })
            }
        }

        // console.log('Comuns - Crex: ', moComuns)
        this.funcS.exlcuirMoeda(moComuns, moExcluir )

    //   this.moCrexExmo = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)

        arrImprimir = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async apiCrex()
    {
      let api_crex = 'https://api.crex24.com/v2/public/tickers',
          res_crex = await fetch(api_crex),
          crex_dados = [] = await res_crex.json(),
          arrMoedas = [] //array de moedas da Crex
      
      for(let i in crex_dados)
      {
          crex_dados[i].instrument = crex_dados[i].instrument.replace('-', '')
          arrMoedas = crex_dados
      }

        return arrMoedas
    }
}