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
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bid, pdVdEx1: moMxc[i].ask,
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
            moExcluir = 
             [
                'ONT3SUSDT', 'ICP3LUSDT', 'MATIC3SUSDT', 'ALICE3SUSDT', 'SNX3SUSDT', 'MANA3LUSDT', 'NEO3LUSDT', 'NEO3LUSDT', 'KSM3LUSDT', 
                'KSM3LUSDT', 'RISEUSDT', 'FTM3LUSDT', 'KSM3SUSDT', 'ZEN3SUSDT', 'XLM3LUSDT', 'XLM3LUSDT', 'AVAX3SUSDT', 'OKB3LUSDT', 
                'OKB3SUSDT', 'ALICE3LUSDT', 'ALICE3LUSDT', 'ICP3SUSDT', 'MATIC3LUSDT', 'MATIC3LUSDT', 'ZEC3LUSDT', 'ZEC3SUSDT', 'NEO3SUSDT', 'NEO3SUSDT', 
                'LUFFYUSDT', 'FTM3SUSDT', 'LUNA3SUSDT', '1INCH3LUSDT', 'UNI3LUSDT', 'TRX3SUSDT', 'LRC3SUSDT', 'LRC3SUSDT', 'BNB3SUSDT', 'YFII3LUSDT', 
                'SUSHI3SUSDT', 'BSV3LUSDT', 'COMP3LUSDT', 'DOGE3SUSDT', 'CHZ3SUSDT', 'ZEN3LUSDT', 'EOS3SUSDT', 'CVC3SUSDT', 'XTZ3LUSDT', 
                'XTZ3LUSDT', 'MANA3SUSDT', 'DOGE3LUSDT', 'DOT3LUSDT', 'AXS3SUSDT', 'VET3SUSDT', 'THETA3SUSDT', 'BTC3LUSDT', 'GRT3SUSDT', 'MKR3SUSDT', 
                'OMG3SUSDT', 'AAVE3LUSDT', 'BTC3SUSDT', 'SHIB3LUSDT', 'ONE3LUSDT', 'THETA3LUSDT', 'ETH3LUSDT', 'LTC3LUSDT', 'OMG3LUSDT', 'LTC3SUSDT', 
                'SKL3SUSDT', 'ETC3SUSDT', 'ONE3SUSDT', 'XLM3SUSDT', 'BAL3LUSDT', 'LINK3SUSDT', 'NEAR3LUSDT', 'ATOM3SUSDT', 'ENJ3LUSDT', 'BAL3SUSDT', 
                'SHIB3SUSDT', 'DYDX3LUSDT', 'EOS3LUSDT', 'AVAX3LUSDT', 'VET3LUSDT', 'DOT3SUSDT', 'ONT3LUSDT', 'CHZ3LUSDT', 'ETH3SUSDT', '', '', '', '', '', '', '', '', '', '', '', '', 
                'ATOM3LUSDT', 'CRV3SUSDT', 'KAVA3LUSDT', 'GRT3LUSDT', 'KAVA3SUSDT', 'LINK3LUSDT', 'SKL3LUSDT', 'MKR3LUSDT', 'XRP3LUSDT', 'SOL3SUSDT', 
                'COMP3SUSDT', 'KLAY3LUSDT', 'ALGO3SUSDT', 'UNI3SUSDT', 'TRX3LUSDT', 'KLAY3SUSDT', '1INCH3SUSDT', 'SUSHI3LUSDT', 'SAND3SUSDT', '', '', 
                'CRV3LUSDT', 'ALGO3LUSDT', 'FREEUSDT', 'CVC3LUSDT', 'YFII3SUSDT', 'BNB3LUSDT', 'BSV3SUSDT', 'DASH3SUSDT', 'AAVE3SUSDT', 'XRP3SUSDT', 
                'QIUSDT', 'MASK3LUSDT', 'ADA3LUSDT', 'ADA3LUSDT', 'SNX3LUSDT', 'XTZ3SUSDT', 'DASH3LUSDT', 'GTCUSDT', 'MASK3SUSDT',
                'ONXUSDT', 'HEROUSDT', 'STARUSDT', 'MDFUSDT', 'ENJ3SUSDT', 'SAND3LUSDT', 'SOL3LUSDT', 'LUNA3LUSDT', 'LRC3LUSDT', 
                'ETC3LUSDT', 'PEOPLE3LUSDT', 'PEOPLE3SUSDT', 'FREE3LUSDT', 'FREE3SUSDT', 'SOS3SUSDT', 'SOS3LUSDT'
             ]
            
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
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bid, pdVdEx1: moMxc[i].ask,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Mexc / XT : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

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
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bid, pdVdEx1: moMxc[i].ask,
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
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bid, pdVdEx1: moMxc[i].ask,
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

    async ztb()
    {
        let Comuns = [],
            exCp = 'ZTB', 
            exVd = 'Mexc', 
            exCp2 = 'Mexc', 
            exVd2 = 'ZTB',

            apiEx2 = 'https://www.ztb.im/api/v1/tickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json(),
            moMxc = [],
            moEx2 = [],
            arrImprimir = [],
            moExcluir = 
                    [
                        'HEROUSDT', 'ETH5LUSDT', 'BTC5LUSDT', 'TCTUSDT', 'FLUXUSDT', 'EOS5SUSDT', 'FLUXUSDT', 'ETH5SUSDT',
                        'DOT5SUSDT', 'PETSUSDT', 'EOS5LUSDT', 'DOT5LUSDT', 'BCH5SUSDT', 'XRP5LUSDT', 'LTC5SUSDT', 'LTC5LUSDT',
                        'TRX5SUSDT', 'BTC5SUSDT', 'BCH5LUSDT', 'XRP5SUSDT', 'TRX5LUSDT', 'PROSUSDT', 'TRADEUSDT', 'RICEUSDT',
                        'MMUSDT', 'FREEUSDT', 'STARSUSDT', 'ASTROUSDT', 'EGCUSDT'
                    ]
            
            moMxc = await this.apiMexc()
            moEx2 = ex2Dados.ticker
    
            // console.log('Dados da MEXC: ', moMxc)
    
            for(let i in moEx2)
            {
                moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
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
                                symbol: moMxc[i].symbol, pdCpEx1: moMxc[i].bid, pdVdEx1: moMxc[i].ask,
                                pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                            })
                }
            }

        // console.log('Comuns entre Mexc / ZTB : ', Comuns)
        this.funcS.exlcuirMoeda(Comuns, moExcluir)

        arrImprimir = this.funcS.pdCpVd(Comuns, exCp, exVd, exCp2, exVd2)        

        // console.log('Arbit MEXC / ZTB: ', arrImprimir)
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