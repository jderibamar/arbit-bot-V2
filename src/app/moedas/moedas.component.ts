import { Component, OnInit } from '@angular/core'
const moRetirar = ['ONEBTC', 'ACMBTC', 'CHESSBTC', 'CHESSUSDT', 'GTCBTC', 'GTCUSDT', 'SUPERBTC', 'EPSBTC', 'OMGBTC', 'KEYUSDT', 'QIUSDT']  //Lista de moedas falsa-positva 

@Component({
  selector: 'app-moedas',
  templateUrl: './moedas.component.html',
  styleUrls: ['./moedas.component.css']
})
export class MoedasComponent implements OnInit 
{

  constructor() { }

  ngOnInit(): void 
  {
    setInterval( () => 
    { 
        this.crexBinance() 
        console.log('--------------------------------------------------------------------------------------------------')
    }, 7000)
    setInterval( () => { this.binanceMexc() }, 7000)
    
    // this.crexBinance()
  }

  async crexBinance()
    {
        let api_crex = 'https://api.crex24.com/v2/public/tickers'
        let res_crex = await fetch(api_crex)
        let crex_dados = await res_crex.json()
        let moC = [] //array de moedas da Crex
        let moComuns = []
        let prCpB = 0
        let prCpC = 0
        let prVdB = 0
        let prVdC = 0
        let lucro = 0        

        let binApiData = await this.apiBin()
        let moB = [] 
            moB = binApiData // lista de moedas da Binance

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
                          symbol: moB[i].symbol, prCpB: moB[i].bidPrice, prVdB: moB[i].askPrice, 
                          moCsymbol: moC[j].instrument, moCPrCp: moC[j].bid, moCPrVd: moC[j].ask
                     })
            }
        }

        this.exlcuirMoeda(moComuns)

        for(let i in moComuns)
        {
            prCpB = moComuns[i].prCpB
            prVdB = moComuns[i].prVdB
            prCpC = moComuns[i].moCPrCp
            prVdC = moComuns[i].moCPrVd

            if(prCpC > prVdB && prVdB > 0)
            {
                lucro = (prCpC - prVdB) / prVdB * 100
                if(lucro > 2)
                    console.log('Comprar ', moComuns[i].symbol, 'na Binance por: ', prVdB, 'e vender na Crex por: ', prCpC, ' Lucro: ', lucro)
            }
            
            if(prCpB > prVdC && prVdC > 0) 
            {
                lucro = (prCpB - prVdC) / prVdC * 100

                if(lucro >= 2)
                    console.log('Comprar ', moComuns[i].symbol, 'na Crex por: ', prVdC, ' e vender na Binance por: ', prCpB, ' Lucro: ', lucro)
            }
        }
       
    }
       
    async binanceMexc()
    {
        let apiMexc = 'https://www.mexc.com/open/api/v2/market/ticker'
        let mexcData = await fetch(apiMexc)
        let respJson = await mexcData.json()
        let moM = respJson.data

        let binApiData = await this.apiBin()
        let moB = binApiData
        let moComuns = []

        let pdCpB = 0
        let pdVdB = 0
        let pdCpM = 0
        let pdVdM = 0
        let lucro = 0

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
                          symbol: moB[i].symbol, prCpB: moB[i].bidPrice, prVdB: moB[i].askPrice, 
                          moMsymbol: moM[j].symbol, moMPrCp: moM[j].bid, moMPrVd: moM[j].ask
                     })
            }
        }

        this.exlcuirMoeda(moComuns)

        for(let i in moComuns)
        {
            pdCpB = moComuns[i].prCpB
            pdVdB = moComuns[i].prVdB
            pdCpM = moComuns[i].moMPrCp
            pdVdM = moComuns[i].moMPrVd

            if(pdCpM > pdVdB && pdVdB > 0)
            {
                lucro = (pdCpM - pdVdB) / pdVdB * 100
                if(lucro > 2)
                    console.log('Comprar ', moComuns[i].symbol, 'na Binance por: ', pdVdB, 'e vender na MEXC por: ', pdCpM, ' Lucro: ', lucro)
            }
            
            if(pdCpB > pdVdM && pdVdM > 0) 
            {
                lucro = (pdCpB - pdVdM) / pdVdM * 100

                if(lucro >= 2)
                    console.log('Comprar ', moComuns[i].symbol, 'na MEXC por: ', pdVdM, ' e vender na Binance por: ', pdCpB, ' Lucro: ', lucro)
            }
        }
    }

    async binanceCryptoCom()
    {
        let apiCyptocom = 'https://api.crypto.com/v2/public/get-trades'
        let cryptData = await fetch(apiCyptocom)
        let respJson = await cryptData.json()
        let moCrypto = []
        let moComuns = []
        let binPdCp = 0
        let binPdVd = 0
        let cryPdCp = 0
        let cryPdVd = 0
        let lucro = 0
        
        
        let moB = await this.apiBin()

        moCrypto = respJson.result.data

        for(let i in moCrypto)
        {
            moCrypto[i].i = moCrypto[i].i.replace('_', '')
        }

        
        for(let i in moB)
        {
            for(let j in moCrypto)
            {
                if(moB[i].symbol === moCrypto[j].i && moB[i].bidPrice > 0 && moB[i].askPrice > 0)
                    moComuns
                    .push(
                     { 
                          symbol: moB[i].symbol, prCpB: moB[i].bidPrice, prVdB: moB[i].askPrice, 
                          moCr_i: moCrypto[j].i, moCr_PrCpVd: moCrypto[j].p, side: moCrypto[j].s
                     })
            }
        }

        for(let i in moComuns)
        {
            
            if(moComuns[i].side == 'BUY')
            {
                cryPdCp =  moComuns[i].moCr_PrCpVd
                binPdVd = moComuns[i].prVdB //Pedra de VENDA na Binance
            }
                
            if(moComuns[i].side == 'SELL')
            {
                cryPdVd = moComuns[i].moCr_PrCpVd
                binPdCp = moComuns[i].prCpB //Pedra de COMPRA na Binance
            }
                

            if(binPdCp > cryPdVd)
            {
                lucro = (binPdCp - cryPdVd) / cryPdVd * 100
                if(lucro >= 2)
                    console.log(`Comprar: ${ moComuns[i].symbol } na Crypto.com por: ${ binPdCp } e Vender na Bin por: ${ cryPdVd } LUCRO: ${ lucro }`)
            }
                

            if(cryPdCp > binPdVd)
            {
                lucro = (cryPdCp - binPdVd) / binPdVd * 100

                if(lucro >= 2)
                    console.log(`Comprar: ${ moComuns[i].symbol } na Bin por: ${ binPdVd } e Vender na Crypto.com por: ${ cryPdCp } LUCRO: ${ lucro }`)
            }    
                        
        }

        // console.log('Moedas comuns Binance / Crypto.com: ', moComuns)
        // console.log('API Cypto.com dados: ', moCrypto)
    }


    async apiBin()
    {
        const bin_url =  'https://api.binance.com/api/v3/ticker/bookTicker'
        const response = await fetch(bin_url)
        return  response.json()
    }

    exlcuirMoeda(arrMoedas = [])
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
