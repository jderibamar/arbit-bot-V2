import { Injectable } from '@angular/core'
import { Funcoes } from './funcoes.service'

@Injectable()
export class ExmoService
{
    constructor(private funcS: Funcoes){}

    async MEXC()
    {
      let Comuns = [],
          exCp = 'MEXC', 
          exVd = 'Exmo', 
          exCp2 = 'Exmo', 
          exVd2 = 'MEXC',

          apiEx2 = 'https://www.mexc.com/open/api/v2/market/ticker',
          ex2Data = await fetch(apiEx2),
          ex2Dados = await ex2Data.json(),
          moExm = [],
          moEx2 = [],
          arrImprimir = [],
          moExcluir = ['DFIUSDT', 'DFIUSDT', 'FLUXUSDT', 'GOLDUSDT', 'GOLDUSDT', 'IOTXUSDT', 'DNAUSDT', 'PINKUSDT', 'PRTUSDT', 'REVUSDT', 'PROSUSDT', 'DTXUSDT']
  
          moExm = await this.apiExmo()
          moEx2 = ex2Dados.data
          // console.log('Dados da Exmo: ', ex2Dados)
  
        for(let i in moEx2)
        {
           moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
        }

      for(let i in moExm)
        {
            for(let j in moEx2)
            {
                if(moExm[i].symbol === moEx2[j].symbol)
                    Comuns
                    .push(
                        { 
                            symbol: moExm[i].symbol, pdCpEx1: moExm[i].bidRate, pdVdEx1: moExm[i].askRate,
                            pdCpEx2: moEx2[j].bid, pdVdEx2: moEx2[j].ask
                        })
            }
        }

        // console.log('Comuns - Exmo / MEXC : ', Comuns)
        // this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async Coinex()
    {
        let Comuns = [],
            exCp = 'Coinex', 
            exVd = 'Exmo', 
            exCp2 = 'Exmo', 
            exVd2 = 'Coinex',

            apiEx2 = 'https://api.coinex.com/perpetual/v1/market/ticker/all',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moExm = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['IOTXUSDT']        
    
            const keys = Object.keys(ex2Dados.data.ticker)
            const values: any = Object.values(ex2Dados.data.ticker)
        
                for(let i in keys)
                {
                    if(values[i].buy > 0 && values[i].sell > 0)
                        moEx2.push({ symbol: keys[i], buy: values[i].buy, sell: values[i].sell })
                } 

            moExm = await this.apiExmo()
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moExm)
            {
                for(let j in moEx2)
                {
                    if(moExm[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moExm[i].symbol, pdCpEx1: moExm[i].bidRate, pdVdEx1: moExm[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Exmo / Coinex : ', Comuns)
        // this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async Biconomy()
    {
        let Comuns = [],
            exCp = 'Biconomy', 
            exVd = 'Exmo', 
            exCp2 = 'Exmo', 
            exVd2 = 'Biconomy',

            apiEx2 = 'https://www.biconomy.com/api/v1/tickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moExm = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['BSTBTC', 'CROUSDT', 'CUTBTC', 'TYCBTC']
            
            moEx2 = ex2Dados.ticker
            moExm = await this.apiExmo()

        
        for(let i in moEx2)
        {
            moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
        }
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moExm)
            {
                for(let j in moEx2)
                {
                    if(moExm[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moExm[i].symbol, pdCpEx1: moExm[i].bidRate, pdVdEx1: moExm[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Exmo / Biconomy : ', Comuns)
        // this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async XT()
    {
        let Comuns = [],
            exCp = 'XT', 
            exVd = 'Exmo', 
            exCp2 = 'Exmo', 
            exVd2 = 'XT',

            apiEx2 = 'https://api.xt.com/data/api/v1/getTickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moExm = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['TSLAUSDT', 'IOTXUSDT', 'GLDUSDT']
            
            moExm = await this.apiExmo()

            const keys = Object.keys(ex2Dados)
            const values: any = Object.values(ex2Dados)
    
            for(let i in keys)
            {
                if(values[i].bid > 0 && values[i].ask > 0)
                moEx2.push({ symbol: keys[i], buy: values[i].bid, sell: values[i].ask })
            }
    
            for(let i in moEx2)
            {
                moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
                moEx2[i].symbol = moEx2[i].symbol.toUpperCase()
            }

            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moExm)
            {
                for(let j in moEx2)
                {
                    if(moExm[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moExm[i].symbol, pdCpEx1: moExm[i].bidRate, pdVdEx1: moExm[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Exmo / XT : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async changelleyPRO()
    {
        let Comuns = [],
            exCp = 'ChanglleyPRO', 
            exVd = 'Exmo', 
            exCp2 = 'Exmo', 
            exVd2 = 'ChanglleyPRO',

            apiEx2 = 'https://api.pro.changelly.com/api/3/public/ticker',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moExm = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['BSTBTC', 'CROUSDT', 'CUTBTC', 'TYCBTC']
            
            moExm = await this.apiExmo()

            const keys = Object.keys(ex2Dados)
            const values: any = Object.values(ex2Dados)
    
            for(let i in keys)
            {
                if(values[i].bid > 0 && values[i].ask > 0)
                moEx2.push({ symbol: keys[i], buy: values[i].bid, sell: values[i].ask })
            }
    
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moExm)
            {
                for(let j in moEx2)
                {
                    if(moExm[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moExm[i].symbol, pdCpEx1: moExm[i].bidRate, pdVdEx1: moExm[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Exmo / ChanglleyPRO : ', Comuns)
        // this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async Ascendex()
    {
        let Comuns = [],
            exCp = 'Ascendex', 
            exVd = 'Exmo', 
            exCp2 = 'Exmo', 
            exVd2 = 'Ascendex',

            apiEx2 = 'https://ascendex.com/api/pro/v1/spot/ticker',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moExm = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['BONDUSDT']
            
            for(let i in ex2Dados.data)
            {
                ex2Dados.data[i].symbol = ex2Dados.data[i].symbol.replace('/', '')
            }

            moExm = await this.apiExmo()
            moEx2 = ex2Dados.data
    
    
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moExm)
            {
                for(let j in moEx2)
                {
                    if(moExm[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moExm[i].symbol, pdCpEx1: moExm[i].bidRate, pdVdEx1: moExm[i].askRate,
                                pdCpEx2: moEx2[j].bid[0], pdVdEx2: moEx2[j].ask[0]
                            })
                }
            }

        // console.log('Comuns entre Exmo / Ascendex : ', Comuns)
        // this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async apiExmo()
    {
      let api_url = 'https://api.exmo.com/v1.1/ticker',
          res_api = await fetch(api_url),
          api_dados = await res_api.json(),
          arrMoedas = []
      
          const keys = Object.keys(api_dados)
          const values: any = Object.values(api_dados)

          for(let i in keys)
          {
              if(values[i].buy_price > 0 && values[i].sell_price > 0)
                arrMoedas.push({ symbol: keys[i], buy: values[i].buy_price, sell: values[i].sell_price })
          }
      

          for(let i in arrMoedas)
          {
              arrMoedas[i].symbol = arrMoedas[i].symbol.replace('_', '')
              arrMoedas[i].symbol = arrMoedas[i].symbol.toUpperCase()
          }

          

        return arrMoedas
    }
}