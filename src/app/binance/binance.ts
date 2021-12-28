import { Component, OnInit } from '@angular/core'
import { Crex24Service } from '../servicos/crex24.service'
import { Funcoes } from '../servicos/funcoes.service'
import { BittrexService } from '../servicos/bittrex.service'
import { ExmoService } from '../servicos/exmo.service'
import { MexcService } from '../servicos/mexc.service'

const temp = 3000

@Component({
  selector: 'app-binance',
  templateUrl: './binance.component.html',
  styleUrls: ['./binance.component.css']
})
export class BinanceComponent implements OnInit 
{
    moBinMexc = []
    moBinCrex = []  
    moBinAscendEX = []
    moBinBitbank = []
    moBinBtcturk = []
    moBinCoinex = []
    moBinCrosstower = []
    moBinCoinsbit = []
    moBinXt = []
    moBinBittrex = []
    moBinHitbtc = []
    moBinExmo = []
    moBinCoindcx = []
    moBinNovaDAX = []
    moBinbinChaneglleypro = []
    moBinbinBankcex = []
    moBinDecoin = []
    moBinToktok = []
    moBinP2pb2b = []
    moBinCoinField = []
    moBinZTB = []

    //variáveis para os dados de outras Excs base
    moCrexExmo: any  
    moCrexMEXC: any
    moCrexCoinex: any
    moCrexBittrex: any
    moCrexXT: any
    moCrexChangellyPro: any
    moCrexAscendex: any
    moCrexZTB: any
    
    moBittrexExmo: any
    moBittrexMexc: any
    moBittrexXT: any
    moBittrexCoinex: any
    moBittrexAscendex: any
    moBittrexChangellyPRO: any
    moBittrexZTB: any
    
    moMexcCoinex: any
    moMexcXT: any
    moMexcChangelleyPRO: any
    moMexcAscendex: any
    moMexcZTB: any

    constructor
    (
        private crexS: Crex24Service, private funcS: Funcoes, private bittrexS: BittrexService, 
        private exmoS: ExmoService, private mexcS: MexcService
    ) { }

    ngOnInit(): void 
    {
        //atualizar a página cada 1 minuto
        setInterval( () => { location.reload() }, 500000)

        setInterval( () => { this.binCrex() }, temp)
        setInterval( () => { this.binMexc() }, temp)
        setInterval( () => { this.binAscendex() }, temp)
        setInterval( () => { this.binBitbank() }, temp)
        setInterval( () => { this.binCoinex() }, temp)
        setInterval( () => { this.binCrossTower() }, temp)
        setInterval( () => { this.binXt() }, temp)
        setInterval( () => { this.binBittrex() }, temp)
        setInterval( () => { this.binExmo() }, temp)
        // setInterval( () => { this.binCoinDCX() }, temp)
        setInterval( () =>{ this.binNovadax() }, temp )
        setInterval( () =>{ this.binChangelleypro() }, temp )
        // setInterval( () =>{ this.binBankcex() }, temp )
        setInterval( () =>{ this.binDecoin() }, temp )
        setInterval( () =>{ this.binToktok() }, temp )
        setInterval( () =>{ this.binP2pb2b() }, temp )
        setInterval( () =>{ this.binCoinField() }, temp )
        setInterval( () =>{ this.ztb() }, temp )

        
        setInterval( () => { this.outrasExs() }, temp)
        
    }

    async binCrex()
    {
        let api_crex = 'https://api.crex24.com/v2/public/tickers',
            res_crex = await fetch(api_crex),
            crex_dados = await res_crex.json(),
            moC = [], //array de moedas da Crex
            moComuns = [],
            moRetirar = ['ONEBTC', 'ACMBTC', 'CHESSBTC', 'CHESSUSDT', 'GTCBTC', 'GTCUSDT', 'SUPERBTC', 'EPSBTC', 'OMGBTC', 'QIUSDT']  //Lista de moedas falsa-positva 
        
        let exCp = 'Crex24', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'Crex24'

        let moB = await this.apiBin() // lista de moedas da Binance

        for(let i in crex_dados)
        {
            crex_dados[i].instrument = crex_dados[i].instrument.replace('-', '')
            moC = crex_dados
        }

        for(let i in moB)
        {
            for(let j in moC)
            {
                if(moB[i].symbol === moC[j].instrument && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moC[j].bid, pdVdEx2: moC[j].ask
                        })
            }
        }

        this.funcS.exlcuirMoeda(moComuns, moRetirar)

        this.moBinCrex = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }
       
    async binMexc() //FALTA ATUALIZAR PARA PEDRA
    {
        let apiMexc = 'https://www.mexc.com/open/api/v2/market/ticker',
            mexcData = await fetch(apiMexc),
            respJson = await mexcData.json(),
            moM = respJson.data,
            moExcluir = ['KEYUSDT', 'QIUSDT', 'FLUXUSDT']

        let binApiData = await this.apiBin(),
            moB = binApiData,
            moComuns = []
        
        let exCp = 'MEXC', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'MEXC'    

        for(let i in respJson.data)
        {
           respJson.data[i].symbol = respJson.data[i].symbol.replace('_', '')
        }

        for(let i in moB)
        {
            for(let j in moM)
            {
                if(moB[i].symbol === moM[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                     { 
                          symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                          pdCpEx2: moM[j].bid, pdVdEx2: moM[j].ask
                     })
            }
        }

        this.funcS.exlcuirMoeda(moComuns, moExcluir)
        this.moBinMexc = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binAscendex()
    {
        let apiAscendex = 'https://ascendex.com/api/pro/v1/spot/ticker'
        let ascData = await fetch(apiAscendex)
        let ascDados = await ascData.json()

        for(let i in ascDados.data)
        {
            ascDados.data[i].symbol = ascDados.data[i].symbol.replace('/', '')
        }
        
        let moA = ascDados.data,
            moComuns = [],
            moExcluir = ['BONDUSDT']
        
            let exCp = 'Ascendex', 
                exVd = 'Binance', 
                exCp2 = 'Binance', 
                exVd2 = 'Ascendex'

        let moB = await this.apiBin() // lista de moedas da Binance
       
        for(let i in moB) //laço para extrair apenas as moedas comuns
        {
            for(let j in moA)
            {
                if(moB[i].symbol === moA[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moA[j].bid[0], pdVdEx2: moA[j].ask[0]
                        })
            }
        }

        this.funcS.exlcuirMoeda(moComuns, moExcluir)
        this.moBinAscendEX = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binBitbank()
    {
        let exCp = 'Binance', 
            exVd = 'Bitbank', 
            exCp2 = 'Bitbank', 
            exVd2 = 'Binance'

        let apiBitbank = 'https://public.bitbank.cc/tickers'
        let bbData = await fetch(apiBitbank)
        let bbDados = await bbData.json()

        for(let i in bbDados.data)
        {
            bbDados.data[i].pair = bbDados.data[i].pair.replace('_', '') //função REPLACE elimina o underline
            bbDados.data[i].pair = bbDados.data[i].pair.toUpperCase() //função toUpperCase coloca em CAIXA ALTA
        }

        let moBb = bbDados.data
        let moComuns = []

        let moB = await this.apiBin()

        for(let i in moB)
        {
            for(let j in moBb)
            {
                if(moB[i].symbol === moBb[j].pair && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moBb[j].buy, pdVdEx2: moBb[j].sell
                        })
            }
        }

        this.moBinBitbank = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binCoinex()
    {
        let exCp = 'Coinex', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'Coinex',
            moComuns = [],
            moCn = []

        let apiCoinex = 'https://api.coinex.com/perpetual/v1/market/ticker/all',
            coinData = await fetch(apiCoinex),
            coinDados = await coinData.json()

          const keys = Object.keys(coinDados.data.ticker)
          const values: any = Object.values(coinDados.data.ticker)
    
        for(let i in keys)
        {
            if(values[i].buy > 0 && values[i].sell > 0)
                moCn.push({ symbol: keys[i], buy: values[i].buy, sell: values[i].sell })
        }    

        let moB = await this.apiBin()

        for(let i in moB)
        {
            for(let j in moCn)
            {
                if(moB[i].symbol === moCn[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moCn[j].buy, pdVdEx2: moCn[j].sell
                        })
            }
        }

        this.moBinCoinex = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binCrossTower()
    {
        let exCp = 'CrossTower', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'CrossTower',
            moComuns = [],
            moCr = []

        let apiCrosstower = 'https://api.crosstower.com/api/3/public/ticker',
            crosstData = await fetch(apiCrosstower),
            crosstDados = await crosstData.json()

        const keys = Object.keys(crosstDados)
        const values: any = Object.values(crosstDados)
 

        for(let i in keys)
        {
            // if(values[i].buy > 0 && values[i].sell > 0)
                moCr.push({ symbol: keys[i], buy: values[i].bid, sell: values[i].ask })
        }

        let moB = await this.apiBin()

        for(let i in moB)
        {
            for(let j in moCr)
            {
                if(moB[i].symbol === moCr[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moCr[j].buy, pdVdEx2: moCr[j].sell
                        })
            }
        }

        this.moBinCrosstower = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binCoinsbit()
    {
        let exCp = 'Binance', 
            exVd = 'Coinsbit', 
            exCp2 = 'Coinsbit', 
            exVd2 = 'Binance',
            moComuns = [],
            moCb = [],
            moB = await this.apiBin()

        let apiCoinsbit = 'https://coinsbit.io/api/v1/public/tickers',
            cobData = await fetch(apiCoinsbit),
            cobDados = await cobData.json()

        const keys = Object.keys(cobDados.result)
        const values: any = Object.values(cobDados.result)

        for(let i in keys)
        {
            if(values[i].ticker.bid > 0 && values[i].ticker.ask > 0)
                moCb.push({ symbol: keys[i], buy: values[i].ticker.bid, sell: values[i].ticker.ask })
        }

        for(let i in moCb)
        {
            moCb[i].symbol = moCb[i].symbol.replace('_', '')
        }

        for(let i in moB)
        {
            for(let j in moCb)
            {
                if(moB[i].symbol === moCb[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moCb[j].buy, pdVdEx2: moCb[j].sell
                        })
            }
        }
        this.moBinCoinsbit = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binXt()
    {
        let exCp = 'XT.com', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'XT.com',
            moComuns = [],
            moEx2 = [],
            moB = await this.apiBin(),
            moExcluir = ['GTCBTC', 'GTCUSDT', 'MCUSDT']

        let apiXt = 'https://api.xt.com/data/api/v1/getTickers',
            xtData = await fetch(apiXt),
            xtDados = await xtData.json()

        const keys = Object.keys(xtDados)
        const values: any = Object.values(xtDados)

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

        // console.log('Array montado: ', moXt)
        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                        })
            }
        }

        this.funcS.exlcuirMoeda(moComuns, moExcluir)
        this.moBinXt = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binBittrex()
    {
        let exCp = 'Bittrex', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'Bittrex',
            moComuns = [],
            moEx2 = [],
            moB = await this.apiBin(),
            moExcluir = ['PLABTC', 'IOTXBTC', 'IOTXUSDT']

    let apiBittrex = 'https://api.bittrex.com/v3/markets/tickers',
        btxData = await fetch(apiBittrex),
        btxDados = await btxData.json()

        moEx2 = btxDados    

    for(let i in moEx2)
    {
        moEx2[i].symbol = moEx2[i].symbol.replace('-', '')
    }

    for(let i in moB)
    {
        for(let j in moEx2)
        {
            if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                moComuns
                .push(
                    { 
                        symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                        pdCpEx2: moEx2[j].bidRate, pdVdEx2: moEx2[j].askRate
                    })
        }
    }

    this.funcS.exlcuirMoeda(moComuns, moExcluir)
    this.moBinBittrex = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binExmo()
    {
        let exCp = 'EXMO', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'EXMO',
            moComuns = [],
            moEx2 = [],
            moB = await this.apiBin(),
            moExcluir = ['GTCBTC', 'GTCUSDT']

    let apiEx2 = 'https://api.exmo.com/v1.1/ticker',
        ex2Data = await fetch(apiEx2),
        ex2Dados = await ex2Data.json()

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

    // console.log('Array montado: ', moEx2)

    for(let i in moB)
    {
        for(let j in moEx2)
        {
            if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                moComuns
                .push(
                    { 
                        symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                        pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                    })
        }
    }

        // console.log('Comuns: ', moComuns)
        // this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinExmo = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binCoinDCX()
    {
        let exCp = 'CoinDCX', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'CoinDCX',
            moComuns = [],
            moEx2 = [],
            moB = await this.apiBin(),
            moExcluir = ['GTCBTC', 'GTCUSDT']

        let apiEx2 = 'https://public.coindcx.com/exchange/ticker',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json()

            moEx2 = ex2Dados

            // console.log('Array montado: ', moEx2)

        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].market && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].bid, pdVdEx2: moEx2[j].ask
                        })
            }
        }

        
        // this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinCoindcx = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
        // console.log('Comuns Bin / CoinDCX: ', moComuns)
        // console.log('Arbit: ', this.moBinCoindcx)
    }

    async binNovadax()
    {
        let exCp = 'NovaDAX', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'NovaDAX',
            moComuns = [],
            moEx2 = [],
            moB = await this.apiBin()

        let apiEx2 = 'https://api.novadax.com/v1/market/tickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json()

            moEx2 = ex2Dados.data

        for(let i in moEx2)
        {
            moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
        }

        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].bid, pdVdEx2: moEx2[j].ask
                        })
            }
        }

        // console.log('Comuns: ', moComuns)
        // this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinNovaDAX = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binChangelleypro()
    {
        let exCp = 'ChanglleyPRO', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'ChanglleyPRO',
            moComuns = [],
            moEx2 = [],
            moB = await this.apiBin(),
            moExcluir = ['BONDBTC']

        let apiEx2 = 'https://api.pro.changelly.com/api/3/public/ticker',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json()

            // console.log('Dados da Exmo: ', ex2Dados)

        const keys = Object.keys(ex2Dados)
        const values: any = Object.values(ex2Dados)

        for(let i in keys)
        {
            if(values[i].bid > 0 && values[i].ask > 0)
                moEx2.push({ symbol: keys[i], buy: values[i].bid, sell: values[i].ask })
        }

        // console.log('Array montado: ', moEx2)

        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                        })
            }
        }

        // console.log('Comuns: ', moComuns)
        this.funcS.exlcuirMoeda(moComuns, moExcluir)
        this.moBinbinChaneglleypro = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binBankcex()
    {
        let exCp = 'Bankcex', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'Bankcex',
            moComuns = [],
            moEx2 = [],
            moB = await this.apiBin(),
            moExcluir = ['GTCBTC', 'GTCUSDT']

        let apiEx2 = 'https://api.bankcex.com/api/v1/ticker/24hr',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json()

            moEx2 = ex2Dados


        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].bidPrice, pdVdEx2: moEx2[j].askPrice
                        })
            }
        }
        
        // this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinbinBankcex = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
        // console.log('Comuns Bin / Bankcex: ', moComuns)
    }

    async binDecoin()
    {
        let exCp = 'Decoin', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'Decoin',
            moComuns = [],
            moB = await this.apiBin()

        let apiEx2 = 'https://apiv1.decoin.io/market/get-ticker',
            ex2Data = await fetch(apiEx2),
            moEx2 = await ex2Data.json()

                    
        for(let i in moEx2)
        {
            moEx2[i].Name = moEx2[i].Name.replace('/', '')
        }

        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].Name && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].BidPrice, pdVdEx2: moEx2[j].AskPrice
                        })
            }
        }

        // this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinDecoin = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binToktok()
    {
        let exCp = 'Toktok',
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'Toktok',
            moEx2 = [],
            moComuns = [],
            moB = await this.apiBin()

        let apiEx2 = 'https://www.tokok.com/api/v1/tickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json()

            moEx2 = ex2Dados.ticker

        for(let i in moEx2)
        {
            moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
        }

        // console.log('Dados da TOKTOK: ', moEx2)

        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                        })
            }
        }

        // console.log('Comuns entre Bin / TOKTOK: ', moComuns)
        // this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinToktok = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binP2pb2b()
    {
        let exCp = 'P2PB2B', 
        exVd = 'Binance', 
        exCp2 = 'Binance', 
        exVd2 = 'P2PB2B',
        moComuns = [],
        moEx2 = [],
        moB = await this.apiBin(),
        moExcluir = ['BONDBTC']

        let apiEx2 = 'http://api.p2pb2b.io/api/v2/public/tickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json()

            // console.log('Dados da P2PB2B: ', ex2Dados.result)

        const keys = Object.keys(ex2Dados.result)
        const values: any = Object.values(ex2Dados.result)

        for(let i in keys)
        {
            // if(values[i].bid > 0 && values[i].ask > 0)
                moEx2.push({ symbol: keys[i], buy: values[i].ticker.bid, sell: values[i].ticker.ask })
        }

        for(let i in moEx2)
        {
            moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
        }

        // console.log('Array montado: ', moEx2)

        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                        })
            }
        }

        // console.log('Comuns: ', moComuns)
        // this.funcS.exlcuirMoeda(moComuns, moExcluir)
        this.moBinP2pb2b = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binCoinField()
    {
        let exCp = 'CoinField', 
        exVd = 'Binance', 
        exCp2 = 'Binance', 
        exVd2 = 'CoinField',
        moComuns = [],
        moEx2 = [],
        moB = await this.apiBin(),
        moExcluir = ['BONDBTC']

        let apiEx2 = 'https://api.coinfield.com/v1/tickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json()

            moEx2 = ex2Dados.markets

        for(let i in moEx2)
        {
            moEx2[i].market_id = moEx2[i].market_id.toUpperCase()
        }

        // console.log('Dados da CoinField: ', moEx2)
        // console.log('Array montado: ', moEx2)

        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].market_id && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].bid, pdVdEx2: moEx2[j].ask
                        })
            }
        }

        // console.log('Comuns entre Bin / CoinField: ', moComuns)
        // this.funcS.exlcuirMoeda(moComuns, moExcluir)
        this.moBinCoinField = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }


    async ztb()
    {
        let exCp = 'ZT', 
        exVd = 'Binance', 
        exCp2 = 'Binance', 
        exVd2 = 'ZT',
        moComuns = [],
        moEx2 = [],
        moB = await this.apiBin(),
        moExcluir = ['KEYUSDT', 'TCTUSDT', 'MCUSDT']

        let apiEx2 = 'https://www.ztb.im/api/v1/tickers',
            ex2Data = await fetch(apiEx2),
            ex2Dados = await ex2Data.json()

            moEx2 = ex2Dados.ticker

        for(let i in moEx2)
        {
            moEx2[i].symbol = moEx2[i].symbol.replace('_', '')
        }

        // console.log('Dados da ZT: ', moEx2)
        // console.log('Array montado: ', moEx2)

        for(let i in moB)
        {
            for(let j in moEx2)
            {
                if(moB[i].symbol === moEx2[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moEx2[j].buy, pdVdEx2: moEx2[j].sell
                        })
            }
        }

        // console.log('Comuns entre Bin / ZT: ', moComuns)
        this.funcS.exlcuirMoeda(moComuns, moExcluir)
        this.moBinZTB = this.funcS.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async apiBin()
    {
        const bin_url =  'https://api.binance.com/api/v3/ticker/bookTicker'
        const response = await fetch(bin_url)
        let arrMoedas = [] = await response.json()
         
        return arrMoedas
    }

    async outrasExs()
    {
        this.moCrexExmo = await this.crexS.Exmo()
        this.moCrexMEXC = await this.crexS.MEXC()
        this.moCrexCoinex =  await this.crexS.Coinex()
        this.moCrexBittrex = await this.crexS.Bittrex()
        this.moCrexXT = await this.crexS.XT()
        this.moCrexChangellyPro = await this.crexS.ChangelleyPRO()
        this.moCrexAscendex = await this.crexS.Ascendex()
        this.moCrexZTB = await this.crexS.ztb()

        this.moBittrexExmo = await this.bittrexS.Exmo()
        this.moBittrexMexc = await this.bittrexS.MEXC()
        this.moBittrexXT = await this.bittrexS.XT()
        this.moBittrexCoinex = await this.bittrexS.Coinex()
        this.moBittrexAscendex = await this.bittrexS.Ascendex()
        this.moBittrexChangellyPRO = await this.bittrexS.ChangelleyPRO()
        this.moBittrexZTB = await this.bittrexS.ztb()

        this.moMexcCoinex = await this.mexcS.Coinex()
        this.moMexcXT = await this.mexcS.XT()
        this.moMexcChangelleyPRO = await this.mexcS.ChangelleyPRO()
        this.moMexcAscendex = await this.mexcS.Ascendex()
        this.moMexcZTB = await this.mexcS.ztb()


    }
}