import { Injectable } from '@angular/core'
import { Funcoes } from './funcoes.service'
// const stocksExchange = require('stocks-exchange-client').client

@Injectable()
export class Crex24Service
{
    funcS: Funcoes

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

        // console.log('Comuns: ', moComuns)
      this.funcS.exlcuirMoeda(moComuns, moExcluir)

    //   this.moCrexExmo = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)

        arrImprimir = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)

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


    pdCpVd(mCom = [], exCp = '', exVd = '', exCp2 = '', exVd2 = '') //Identifica a pedra de Compra e Venda
    {
        let pdCpEx1 = 0,
            pdVdEx1 = 0,
            pdCpEx2 = 0,
            pdVdEx2 = 0,
            lucro = 0,
            arrPrintar = [],
            maLucro = 0 //para garantir o maior lucro quando houver

        for(let i in mCom)
        {
            pdCpEx1 = mCom[i].pdCpEx1
            pdVdEx1 = mCom[i].pdVdEx1
            pdCpEx2 = mCom[i].pdCpEx2
            pdVdEx2 = mCom[i].pdVdEx2


            if(pdCpEx1 > pdVdEx2 && pdVdEx2 > 0)
            {
                lucro = (pdCpEx1 - pdVdEx2) / pdVdEx2 * 100
                maLucro = lucro
                if(lucro >= 2)
                {
                    arrPrintar
                    .push({ symbol: mCom[i].symbol, pdCp: pdCpEx1, pdVd: pdVdEx2, excCp: exCp, excVd: exVd, lucro: lucro })
                }
            }
            
            if(pdCpEx2 > pdVdEx1 && pdVdEx1 > 0) 
            {
                lucro = (pdCpEx2 - pdVdEx1) / pdVdEx1 * 100

                if(lucro >= 2 && lucro > maLucro)
                {
                    arrPrintar
                    .push({ symbol: mCom[i].symbol, pdCp: pdCpEx2, pdVd: pdVdEx1, excCp: exCp2, excVd: exVd2, lucro: lucro })
                }                    
            }
        }

        return arrPrintar
    }
}