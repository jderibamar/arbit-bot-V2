import { Injectable } from '@angular/core'
import { Funcoes } from './funcoes.service'

@Injectable()
export class MexcService
{
    constructor(private funcS: Funcoes){}

    async Coinex()
    {
        let Comuns = [],
            exCp = 'Coinex', 
            exVd = 'Mexc', 
            exCp2 = 'Mexc', 
            exVd2 = 'Coinex',

            apiEx2 = 'https://api.coinex.com/perpetual/v1/market/ticker/all',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moMxc = [],
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

            moMxc = await this.apiMexc()

        for(let i in moMxc)
            {
                for(let j in moEx2)
                {
                    if(moMxc[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bidRate, pdVdEx1: moMxc[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Mexc / Coinex : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir )

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async XT()
    {
        let Comuns = [],
            exCp = 'XT', 
            exVd = 'Mexc', 
            exCp2 = 'Mexc', 
            exVd2 = 'XT',

            apiEx2 = 'https://api.xt.com/data/api/v1/getTickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moMxc = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['TSLAUSDT', 'IOTXUSDT', 'GLDUSDT']
            
            moMxc = await this.apiMexc()

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

        for(let i in moMxc)
            {
                for(let j in moEx2)
                {
                    if(moMxc[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bidRate, pdVdEx1: moMxc[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Mexc / XT : ', Comuns)
        // this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async ChangelleyPRO()
    {
        let Comuns = [],
            exCp = 'ChanglleyPRO', 
            exVd = 'Mexc', 
            exCp2 = 'Mexc', 
            exVd2 = 'ChanglleyPRO',

            apiEx2 = 'https://api.pro.changelly.com/api/3/public/ticker',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moMxc = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['STCBTC']
            
            moMxc = await this.apiMexc()

            const keys = Object.keys(ex2Dados)
            const values: any = Object.values(ex2Dados)
    
            for(let i in keys)
            {
                if(values[i].bid > 0 && values[i].ask > 0)
                    moEx2.push({ symbol: keys[i], buy: values[i].bid, sell: values[i].ask })
            }
    
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moMxc)
            {
                for(let j in moEx2)
                {
                    if(moMxc[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bidRate, pdVdEx1: moMxc[i].askRate,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Mexc / ChanglleyPRO : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async Ascendex()
    {
        let Comuns = [],
            exCp = 'Ascendex', 
            exVd = 'Mexc', 
            exCp2 = 'Mexc', 
            exVd2 = 'Ascendex',

            apiEx2 = 'https://ascendex.com/api/pro/v1/spot/ticker',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moMxc = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = ['BONDUSDT']
            
            for(let i in ex2Dados.data)
            {
                ex2Dados.data[i].symbol = ex2Dados.data[i].symbol.replace('/', '')
            }

            moMxc = await this.apiMexc()
            moEx2 = ex2Dados.data
    
    
            // console.log('Dados da Exmo: ', ex2Dados)

        for(let i in moMxc)
            {
                for(let j in moEx2)
                {
                    if(moMxc[i].symbol === moEx2[j].symbol)
                        Comuns
                        .push(
                            { 
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bidRate, pdVdEx1: moMxc[i].askRate,
                                pdCpEx2: moEx2[j].bid[0], pdVdEx2: moEx2[j].ask[0]
                            })
                }
            }

        // console.log('Comuns entre Mexc / Ascendex : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Imprimir: ', arrImprimir)
        return arrImprimir
    }

    async apiMexc()
    {
      let api_url = 'https://www.mexc.com/open/api/v2/market/ticker',
          res_api = await fetch(api_url),
          api_dados = await res_api.json(),
          arrMoedas = []

      for(let i in api_dados.data)
      {
          api_dados.data[i].symbol = api_dados.data[i].symbol.replace('_', '')
          arrMoedas = api_dados.data
      }

        return arrMoedas
    }
}