import { Injectable } from '@angular/core'
import { Funcoes } from './funcoes.service'

@Injectable()
export class BittrexService
{
    constructor(private funcS: Funcoes){}

    async Exmo()
    {
      let Comuns = [],
          exCp = 'EXMO', 
          exVd = 'Bittrex', 
          exCp2 = 'Bittrex', 
          exVd2 = 'EXMO',

          apiEx2 = 'https://api.exmo.com/v1.1/ticker',
          ex2Data = await fetch(apiEx2),
          ex2Dados = await ex2Data.json(),
          moBtx = [],
          moEx2 = [],
          arrImprimir = [],
          moExcluir = ['CRONBTC', 'CRONUSDT']
  
          moBtx = await this.apiBittrex()
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

      for(let i in moBtx)
        {
            for(let j in moEx2)
            {
                if(moBtx[i].symbol === moEx2[j].symbol)
                    Comuns
                    .push(
                        { 
                            symbol: moBtx[i].symbol, pdCpEx1: moBtx[i].bidRateRate, pdVdEx1: moBtx[i].askRateRate,
                            pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                        })
            }
        }

        // console.log('Comuns entre Bittrex e Exmo: ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async MEXC()
    {
      let Comuns = [],
          exCp = 'MEXC', 
          exVd = 'Bittrex', 
          exCp2 = 'Bittrex', 
          exVd2 = 'MEXC',

          apiEx2 = 'https://www.mexc.com/open/api/v2/market/ticker',
          ex2Data = await fetch(apiEx2),
          ex2Dados = await ex2Data.json(),
          moBtx = [],
          moEx2 = [],
          arrImprimir = [],
          moExcluir = ['DFIUSDT', 'DFIUSDT', 'FLUXUSDT', 'GOLDUSDT', 'GOLDUSDT', 'IOTXUSDT', 'DNAUSDT', 'PINKUSDT', 'PRTUSDT', 'REVUSDT', 'PROSUSDT', 'DTXUSDT']
  
          moBtx = await this.apiBittrex()
          moEx2 = ex2Dados.data
          // console.log('Dados da Exmo: ', ex2Dados)
  
        for(let i in moEx2)
        {
           moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
        }

      for(let i in moBtx)
        {
            for(let j in moEx2)
            {
                if(moBtx[i].symbol === moEx2[j].symbol)
                    Comuns
                    .push(
                        { 
                            symbol: moBtx[i].symbol, pdCpEx1: moBtx[i].bidRate, pdVdEx1: moBtx[i].askRate,
                            pdCpEx2: moEx2[j].bid, pdVdEx2: moEx2[j].ask
                        })
            }
        }

        // console.log('Comuns - Bittrex / MEXC : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

    //   this.moBtxrexExmo = this.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async Coinex()
    {
        let Comuns = [],
            exCp = 'Coinex', 
            exVd = 'Bittrex', 
            exCp2 = 'Bittrex', 
            exVd2 = 'Coinex',

            apiEx2 = 'https://api.coinex.com/perpetual/v1/market/ticker/all',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moBtx = [],
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

            moBtx = await this.apiBittrex()
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moBtx)
            {
                for(let j in moEx2)
                {
                    if(moBtx[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moBtx[i].symbol, pdCpEx1: moBtx[i].bidRate, pdVdEx1: moBtx[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Bittrex / Coinex : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir )

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async XT()
    {
        let Comuns = [],
            exCp = 'XT', 
            exVd = 'Bittrex', 
            exCp2 = 'Bittrex', 
            exVd2 = 'XT',

            apiEx2 = 'https://api.xt.com/data/api/v1/getTickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moBtx = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['TSLAUSDT', 'IOTXUSDT', 'GLDUSDT']
            
            moBtx = await this.apiBittrex()

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

        for(let i in moBtx)
            {
                for(let j in moEx2)
                {
                    if(moBtx[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moBtx[i].symbol, pdCpEx1: moBtx[i].bidRate, pdVdEx1: moBtx[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Bittrex / XT : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async ChangelleyPRO()
    {
        let Comuns = [],
            exCp = 'ChanglleyPRO', 
            exVd = 'Bittrex', 
            exCp2 = 'Bittrex', 
            exVd2 = 'ChanglleyPRO',

            apiEx2 = 'https://api.pro.changelly.com/api/3/public/ticker',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moBtx = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['STCBTC']
            
            moBtx = await this.apiBittrex()

            const keys = Object.keys(ex2Dados)
            const values: any = Object.values(ex2Dados)
    
            for(let i in keys)
            {
                if(values[i].bid > 0 && values[i].ask > 0)
                moEx2.push({ symbol: keys[i], buy: values[i].bid, sell: values[i].ask })
            }
    
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moBtx)
            {
                for(let j in moEx2)
                {
                    if(moBtx[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moBtx[i].symbol, pdCpEx1: moBtx[i].bidRate, pdVdEx1: moBtx[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Bittrex / ChanglleyPRO : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async Ascendex()
    {
        let Comuns = [],
            exCp = 'Ascendex', 
            exVd = 'Bittrex', 
            exCp2 = 'Bittrex', 
            exVd2 = 'Ascendex',

            apiEx2 = 'https://ascendex.com/api/pro/v1/spot/ticker',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moBtx = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['BONDUSDT']
            
            for(let i in ex2Dados.data)
            {
                ex2Dados.data[i].symbol = ex2Dados.data[i].symbol.replace('/', '')
            }

            moBtx = await this.apiBittrex()
            moEx2 = ex2Dados.data
    
    
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moBtx)
            {
                for(let j in moEx2)
                {
                    if(moBtx[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moBtx[i].symbol, pdCpEx1: moBtx[i].bidRate, pdVdEx1: moBtx[i].askRate,
                                pdCpEx2: moEx2[j].bid[0], pdVdEx2: moEx2[j].ask[0]
                            })
                }
            }

        // console.log('Comuns entre Bittrex / Ascendex : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }
    
    async ztb()
    {
      let Comuns = [],
          exCp = 'ZTB', 
          exVd = 'Bittrex', 
          exCp2 = 'Bittrex', 
          exVd2 = 'ZTB',

          apiEx2 = 'https://www.ztb.im/api/v1/tickers',
          ex2Data = await fetch(apiEx2),
          ex2Dados = await ex2Data.json(),
          moBtx = [],
          moEx2 = [],
          arrImprimir = [],
          moExcluir = 
          [
            'ADABULLUSDT', 'ATOMBULLUSDT', 'BCHBULLUSDT', 'BEARUSDT', 'BLOCKUSDT', 'DOGEBULLUSDT', 'ETHBEARUSDT', 'LINKBULLUSDT', 
            'LINKBULLUSDT', 'MATICBULLUSDT', 'GAMEUSDT', 'PROSUSDT', 'XRPBULLUSDT', 'XTZBULLUSDT', 'PRTUSDT', 'PRTUSDT', 'REALUSDT', 
            'IOTXUSDT', 'GSTUSDT'
          ]
  
          moBtx = await this.apiBittrex()
          moEx2 = ex2Dados.ticker
          // console.log('Dados da Exmo: ', ex2Dados)
  
        for(let i in moEx2)
        {
           moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
        }

      for(let i in moBtx)
        {
            for(let j in moEx2)
            {
                if(moBtx[i].symbol === moEx2[j].symbol)
                    Comuns
                    .push(
                        { 
                            symbol: moBtx[i].symbol, pdCpEx1: moBtx[i].bidRate, pdVdEx1: moBtx[i].askRate,
                            pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                        })
            }
        }

        // console.log('Comuns - Bittrex / ZTB : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

    //   this.moBtxrexExmo = this.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async apiBittrex()
    {
      let api_btx = 'https://api.bittrex.com/v3/markets/tickers',
          res_btx = await fetch(api_btx),
          btx_dados = [] = await res_btx.json(),
          arrMoedas = []
      
      for(let i in btx_dados)
      {
        btx_dados[i].symbol = btx_dados[i].symbol.replace('-', '')
          arrMoedas = btx_dados
      }

        return arrMoedas
    }
}