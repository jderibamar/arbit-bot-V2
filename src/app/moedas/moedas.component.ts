import { Component, OnInit } from '@angular/core'
const moRetirar = ['ONEBTC', 'ACMBTC', 'CHESSBTC', 'CHESSUSDT', 'GTCBTC', 'GTCUSDT', 'SUPERBTC', 'EPSBTC', 'OMGBTC', 'QIUSDT']  //Lista de moedas falsa-positva 

@Component({
  selector: 'app-moedas',
  templateUrl: './moedas.component.html',
  styleUrls: ['./moedas.component.css']
})
export class MoedasComponent implements OnInit 
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

    constructor() { }

    ngOnInit(): void 
    {
        setInterval( () => { this.binanceCrex() }, 5000)
        setInterval( () => { this.binanceMexc() }, 5000)
        setInterval( () => { this.binanceAscendex() }, 5000)
        setInterval( () => { this.binanceBitbank() }, 5000)
        setInterval( () => { this.binanceCoinex() }, 5000)
        setInterval( () => { this.binanceCrossTower() }, 5000)
        setInterval( () => { this.binanceCoinsbit() }, 5000)
        setInterval( () => { this.binanceXt() }, 5000)
        setInterval( () => { this.binanceBittrex() }, 5000)
        
        
    }

    async binanceCrex()
    {
        let api_crex = 'https://api.crex24.com/v2/public/tickers'
        let res_crex = await fetch(api_crex)
        let crex_dados = await res_crex.json()
        let moC = [] //array de moedas da Crex
        let moComuns = []
        
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

        this.exlcuirMoeda(moComuns, moRetirar)

        this.moBinCrex = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }
       
    async binanceMexc() //FALTA ATUALIZAR PARA PEDRA
    {
        let apiMexc = 'https://www.mexc.com/open/api/v2/market/ticker',
            mexcData = await fetch(apiMexc),
            respJson = await mexcData.json(),
            moM = respJson.data,
            moExcluir = ['KEYUSDT', 'QIUSDT']

        let binApiData = await this.apiBin(),
            moB = binApiData,
            moComuns = []
        
        let exCp = 'Binance', 
            exVd = 'MEXC', 
            exCp2 = 'MEXC', 
            exVd2 = 'Binance'    

        // let arrPrintar = []     

        // let pdCpB = 0
        // let pdVdB = 0
        // let pdCpM = 0
        // let pdVdM = 0
        // let lucro = 0

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

        this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinMexc = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)

        // for(let i in moComuns)
        // {
        //     pdCpB = moComuns[i].prCpB
        //     pdVdB = moComuns[i].prVdB
        //     pdCpM = moComuns[i].moMPrCp
        //     pdVdM = moComuns[i].moMPrVd
            
        //     if(pdCpB > pdVdM && pdVdM > 0) 
        //     {
        //         lucro = (pdCpB - pdVdM) / pdVdM * 100

        //         if(lucro >= 2)
        //         {
        //             arrPrintar
        //             .push({ symbol: moComuns[i].symbol, pdCp: pdCpB, pdVd: pdVdM, excCp: 'MEXC', excVd: 'Binance', lucro: lucro })
        //             console.log('Comprar ', moComuns[i].symbol, 'na MEXC por: ', pdVdM, ' e vender na Binance por: ', pdCpB, ' Lucro: ', lucro)
        //         }
        //     }
           
        //     if(pdCpM > pdVdB && pdVdB > 0)
        //     {
        //         lucro = (pdCpM - pdVdB) / pdVdB * 100
        //         if(lucro > 2)
        //         {
        //             arrPrintar
        //             .push({ symbol: moComuns[i].symbol, pdCp: pdCpM, pdVd: pdVdB, excCp: 'Binance', excVd: 'MEXC', lucro: lucro })
        //             console.log('Comprar ', moComuns[i].symbol, 'na Binance por: ', pdVdB, 'e vender na MEXC por: ', pdCpM, ' Lucro: ', lucro)
        //         }
        //     }
           
        // }
        // this.moBinMexc = arrPrintar
    }

    async binanceAscendex()
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
            // pdCpB = 0, 
            // pdVdB = 0, 
            // pdCpA = 0, 
            // pdVdA = 0, 
            // lucro = 0,
            // arrPrintar = []

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

        this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinAscendEX = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)


        // for(let i in moComuns)
        // {
        //     pdCpB = moComuns[i].pdCpB
        //     pdVdB = moComuns[i].pdVdB
        //     pdCpA = moComuns[i].pdCpA 
        //     pdVdA = moComuns[i].prVdA

        //     if(pdCpA > pdVdB && pdVdB > 0)
        //     {
        //         lucro = (pdCpA - pdVdB) / pdVdB * 100
        //         if(lucro > 2)
        //         {
        //             arrPrintar
        //             .push({ symbol: moComuns[i].symbol, pdCp: pdCpA, pdVd: pdVdB, excCp: 'Binance', excVd: 'AscendEX', lucro: lucro })
        //                 //    console.log('Comprar ', moComuns[i].symbol, 'na Binance por: ', pdVdB, 'e vender na AscendEX por: ', pdCpA, ' Lucro: ', lucro)    
        //         }
        //     }
            
        //     if(pdCpB > pdVdA && pdVdA > 0) 
        //     {
        //         lucro = (pdCpB - pdVdA) / pdVdA * 100

        //         if(lucro >= 2)
        //         {
        //             arrPrintar
        //             .push({ symbol: moComuns[i].symbol, pdCp: pdCpB, pdVd: pdVdA, excCp: 'AscendEX', excVd: 'Binance', lucro: lucro })
        //                 // console.log('Comprar ', moComuns[i].symbol, 'na AscendEX por: ', pdVdA, ' e vender na Binance por: ', pdCpB, ' Lucro: ', lucro)     
        //         }                    
        //     }
        // }

        // this.moBinAscendEX = arrPrintar
        

        // console.log('Dados AscendEX: ', ascDados.data)
        // console.log('Comuns Binance / Ascendex: ', moComuns)
    }

    async binanceBitbank()
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

        this.moBinBitbank = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binanceCoinex()
    {
        let exCp = 'Binance', 
            exVd = 'Coinex', 
            exCp2 = 'Coinex', 
            exVd2 = 'Binance',
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

        this.moBinCoinex = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binanceCrossTower()
    {
        let exCp = 'Binance', 
        exVd = 'CrossTower', 
        exCp2 = 'CrossTower', 
        exVd2 = 'Binance',
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

        this.moBinCrosstower = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binanceCoinsbit()
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
        this.moBinCoinsbit = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binanceXt()
    {
        let exCp = 'XT.com', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'XT.com',
            moComuns = [],
            moXt = [],
            moB = await this.apiBin(),
            moExcluir = ['GTCBTC', 'GTCUSDT']

        let apiXt = 'https://api.xt.com/data/api/v1/getTickers',
            xtData = await fetch(apiXt),
            xtDados = await xtData.json()

        const keys = Object.keys(xtDados)
        const values: any = Object.values(xtDados)

        for(let i in keys)
        {
            if(values[i].bid > 0 && values[i].ask > 0)
                moXt.push({ symbol: keys[i], buy: values[i].bid, sell: values[i].ask })
        }

        for(let i in moXt)
        {
            moXt[i].symbol = moXt[i].symbol.replace('_', '')
            moXt[i].symbol = moXt[i].symbol.toUpperCase()
        }

        // console.log('Array montado: ', moXt)
        for(let i in moB)
        {
            for(let j in moXt)
            {
                if(moB[i].symbol === moXt[j].symbol && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                        { 
                            symbol: moB[i].symbol, pdCpEx1: moB[i].bidPrice, pdVdEx1: moB[i].askPrice, 
                            pdCpEx2: moXt[j].buy, pdVdEx2: moXt[j].sell
                        })
            }
        }

        this.exlcuirMoeda(moComuns, moExcluir)
        this.moBinXt = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async binanceBittrex()
    {
        let exCp = 'Bittrex', 
            exVd = 'Binance', 
            exCp2 = 'Binance', 
            exVd2 = 'Bittrex',
            moComuns = [],
            moEx2 = [],
            moB = await this.apiBin(),
            moExcluir = ['PLABTC']

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

    this.exlcuirMoeda(moComuns, moExcluir)
    this.moBinBittrex = this.pdCpVd(moComuns, exCp, exVd, exCp2, exVd2)
    }

    async apiBin()
    {
        const bin_url =  'https://api.binance.com/api/v3/ticker/bookTicker'
        const response = await fetch(bin_url)
        let arrMoedas = [] = await response.json()
         
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

    exlcuirMoeda(arrMoedas = [], moRetirar = [])
    {
        for(let i in moRetirar) //laço para excluir moedas falsa-positiva
        {
            for(let j = 0; j < arrMoedas.length; j++)
            {
                if(moRetirar[i] == arrMoedas[j].symbol)
                    arrMoedas.splice(j, 1)
            }
        }
    }

}
